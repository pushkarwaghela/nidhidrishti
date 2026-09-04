import networkx as nx
import pandas as pd

def analyze_contractor_network(works_list):
    """
    Builds a bipartite network graph of MP -> District -> Contractor relationships.
    Computes HHI concentration index, degree centrality, and monopolization risks.
    Returns:
      1. contractor_metrics: dict of contractor_name -> concentration risk data
      2. graph_json: JSON serializable dict of {nodes, links} for UI visualization
    """
    G = nx.Graph()
    district_contractor_funds = {}
    contractor_mp_map = {}

    for w in works_list:
        mp = f"MP: {w.mp_name}"
        district = f"Dist: {w.nodal_district}"
        contractor = f"Vendor: {w.contractor_name}"
        amt = w.sanctioned_amount

        # Add graph nodes
        G.add_node(mp, type="mp", label=w.mp_name)
        G.add_node(district, type="district", label=w.nodal_district)
        G.add_node(contractor, type="contractor", label=w.contractor_name)

        # Add edges with weights
        if G.has_edge(mp, district):
            G[mp][district]["weight"] += amt
            G[mp][district]["count"] += 1
        else:
            G.add_edge(mp, district, weight=amt, count=1)

        if G.has_edge(district, contractor):
            G[district][contractor]["weight"] += amt
            G[district][contractor]["count"] += 1
        else:
            G.add_edge(district, contractor, weight=amt, count=1)

        # Track district contractor fund share for HHI calculation
        if w.nodal_district not in district_contractor_funds:
            district_contractor_funds[w.nodal_district] = {}
        district_contractor_funds[w.nodal_district][w.contractor_name] = (
            district_contractor_funds[w.nodal_district].get(w.contractor_name, 0.0) + amt
        )

        # Track MP-contractor link
        if w.contractor_name not in contractor_mp_map:
            contractor_mp_map[w.contractor_name] = set()
        contractor_mp_map[w.contractor_name].add(w.mp_name)

    # Calculate Herfindahl-Hirschman Index (HHI) per district
    # HHI = sum((market_share_pct)^2)
    district_hhi = {}
    for district, vendors in district_contractor_funds.items():
        total_funds = sum(vendors.values()) or 1.0
        hhi = sum(((amt / total_funds) * 100.0)**2 for amt in vendors.values())
        district_hhi[district] = hhi

    # Calculate Degree Centrality
    degree_centrality = nx.degree_centrality(G)

    # Compile contractor metrics
    contractor_metrics = {}
    for c_node in [n for n, d in G.nodes(data=True) if d.get("type") == "contractor"]:
        c_name = G.nodes[c_node]["label"]
        deg = degree_centrality.get(c_node, 0.0)
        mp_count = len(contractor_mp_map.get(c_name, []))

        # Check maximum market share in any single district
        max_share = 0.0
        max_district = ""
        for district, vendors in district_contractor_funds.items():
            if c_name in vendors:
                total_funds = sum(vendors.values()) or 1.0
                share = (vendors[c_name] / total_funds) * 100.0
                if share > max_share:
                    max_share = share
                    max_district = district

        # Concentration score (0 to 1)
        is_monopoly = max_share >= 50.0
        conc_score = min(1.0, (max_share / 100.0) * 1.2)

        contractor_metrics[c_name] = {
            "degree_centrality": float(deg),
            "max_district_share_pct": float(round(max_share, 1)),
            "dominant_district": max_district,
            "district_hhi": float(round(district_hhi.get(max_district, 0.0), 1)),
            "mp_count": mp_count,
            "concentration_score": float(conc_score),
            "is_monopoly_risk": is_monopoly
        }

    # Format graph for D3/vis UI components
    nodes_list = []
    for n, data in G.nodes(data=True):
        nodes_list.append({
            "id": n,
            "label": data.get("label", n),
            "type": data.get("type", "node"),
            "degree": int(G.degree(n))
        })

    links_list = []
    for u, v, data in G.edges(data=True):
        links_list.append({
            "source": u,
            "target": v,
            "weight": float(data.get("weight", 0.0)),
            "count": int(data.get("count", 1))
        })

    graph_json = {"nodes": nodes_list, "links": links_list}
    return contractor_metrics, graph_json
