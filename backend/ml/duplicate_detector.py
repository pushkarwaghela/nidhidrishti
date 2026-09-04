import math
from difflib import SequenceMatcher

try:
    from rapidfuzz import fuzz
    HAS_RAPIDFUZZ = True
except ImportError:
    HAS_RAPIDFUZZ = False

def calculate_haversine_distance(lat1, lon1, lat2, lon2):
    if None in (lat1, lon1, lat2, lon2):
        return 999999.0
    R = 6371000.0  # Earth radius in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c

def calculate_text_similarity(str1, str2):
    if not str1 or not str2:
        return 0.0
    s1, s2 = str1.lower().strip(), str2.lower().strip()
    if HAS_RAPIDFUZZ:
        return float(fuzz.token_set_ratio(s1, s2)) / 100.0
    else:
        return float(SequenceMatcher(None, s1, s2).ratio())

def detect_duplicate_works(works_list, max_distance_meters=500.0, min_text_similarity=0.75):
    """
    Scans all work records for text similarity and spatial proximity.
    Returns a dictionary of work_id -> duplicate match metadata.
    """
    duplicates = {}
    n = len(works_list)

    for i in range(n):
        w1 = works_list[i]
        best_match = None
        highest_sim = 0.0
        closest_dist = 999999.0

        for j in range(n):
            if i == j:
                continue
            w2 = works_list[j]

            # Geospatial filter: ignore if distance > max_distance_meters
            dist = calculate_haversine_distance(w1.latitude, w1.longitude, w2.latitude, w2.longitude)
            if dist > max_distance_meters:
                continue

            text_sim = calculate_text_similarity(w1.work_name, w2.work_name)
            if text_sim >= min_text_similarity:
                if text_sim > highest_sim:
                    highest_sim = text_sim
                    closest_dist = dist
                    best_match = w2

        if best_match:
            # Composite duplicate risk score (0 to 1)
            dup_score = highest_sim * (1.0 - min(1.0, closest_dist / max_distance_meters))
            duplicates[w1.work_id] = {
                "matched_work_id": best_match.work_id,
                "matched_work_name": best_match.work_name,
                "matched_mp_name": best_match.mp_name,
                "text_similarity": round(highest_sim * 100.0, 1),
                "distance_meters": round(closest_dist, 1),
                "duplicate_score": float(dup_score)
            }

    return duplicates
