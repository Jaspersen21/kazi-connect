import pytest

from tests.safety import (
    APPROVED_TEST_URL,
    APPROVED_TEST_DB,
    validate_test_database,
)


def test_approved_configuration():
    validate_test_database(APPROVED_TEST_URL, APPROVED_TEST_DB)


def test_unapproved_database_name():
    # Arrange: We need an approved URL and an incorrect database name.
    unapproved_db_name = "kazi_connect_production"
    approved_url = APPROVED_TEST_URL

    # Act: Call the validation function.
    with pytest.raises(RuntimeError):
        validate_test_database(approved_url, unapproved_db_name)


def test_unapproved_database_url():
    # Arrange
    unapproved_url = "mongodb://127.0.0.1:27017"
    approved_db_name = APPROVED_TEST_DB

    # Act and Assert
    with pytest.raises(RuntimeError):
        validate_test_database(unapproved_url, approved_db_name)
