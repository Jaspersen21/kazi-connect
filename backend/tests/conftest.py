
import os

from tests.safety import (
    APPROVED_TEST_URL,
    APPROVED_TEST_DB,
    validate_test_database,
)

# Step 1: Read existing process environment settings.
current_url = os.environ.get("MONGO_URL")
current_db = os.environ.get("DB_NAME")

# Step 2: Reject unapproved existing values.
if current_url is not None and current_url != APPROVED_TEST_URL:
    raise RuntimeError("Unapproved MongoDB URL in test environment")

if current_db is not None and current_db != APPROVED_TEST_DB:
    raise RuntimeError("Unapproved database name in test environment")

# Step 3: Configure this test process.
os.environ["MONGO_URL"] = APPROVED_TEST_URL
os.environ["DB_NAME"] = APPROVED_TEST_DB
os.environ["SECRET_KEY"] = "test-only-secret-not-for-production"

# Step 4: Validate the final configuration.
validate_test_database(
    os.environ["MONGO_URL"],
    os.environ["DB_NAME"],
)
