import os

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = "personal-web"
AWS_S3_ENDPOINT_URL = "https://fra1.digitaloceanspaces.com"
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": "max-age=86400",
}
AWS_LOCATION = "https://personal-web.fra1.digitaloceanspaces.com"
DEFAULT_FILE_STORAGE = "core.cdn.backends.MediaRootS3Boto3Storage"
STATICFILE_STORAGE = "core.cdn.backends.StaticRootS3Boto3Storage"