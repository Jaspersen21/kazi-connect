APPROVED_TEST_URL = "mongodb://127.0.0.1:1"
APPROVED_TEST_DB = "kazi_connect_test"


def validate_test_database(mongo_url, db_name):
    if mongo_url != APPROVED_TEST_URL or db_name != APPROVED_TEST_DB:
        raise RuntimeError("unsafe test configuration")
