def format_mongo_doc(doc: dict | None) -> dict | None:
    if doc is None:
        return None

    formatted = doc.copy()

    if "_id" in formatted:
        formatted["id"] = str(formatted["_id"])
        del formatted["_id"]

    return formatted

def format_job(doc: dict | None) -> dict | None:
    formatted = format_mongo_doc(doc)

    if formatted is None:
        return None

    if "created_by" in formatted:
        formatted["created_by"] = str(formatted["created_by"])

    return formatted

def format_application(doc: dict | None) -> dict | None:
    formatted = format_mongo_doc(doc)

    if formatted is None:
        return None

    if "job_id" in formatted:
        formatted["job_id"] = str(formatted["job_id"])

    if "user_id" in formatted:
        formatted["user_id"] = str(formatted["user_id"])

    return formatted

def format_user(doc: dict | None) -> dict | None:
    formatted = format_mongo_doc(doc)

    if formatted is None:
        return None

    if "password" in formatted:
        del formatted["password"]

    return formatted