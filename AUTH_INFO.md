arn:aws:iam::557071074234:role/Cognito_identity_pool_devAuth_Role

# 1. 认证成功后 localtionn 返回 id_token and access_token

http://localhost:3000#?...

```
{
    "access_token": "access_token",
    "expires_in": "3600",
    "id_token": "id_token",
    "state": "GHJqMQC30D6OE3p6j9Y16SNyX2w86Mjb",
    "token_type": "Bearer"
}
```

# 2. 调用 aws 接口 获取 IdentityId

https://cognito-identity.us-east-2.amazonaws.com/

## req

```json

{
  "IdentityPoolId": "{identityPoolId}",
  "Logins": {
    "cognito-idp.us-east-2.amazonaws.com/{userPoolId}": "{id_token}"
  }
}
```

## resp

```json
{
  "IdentityId": "us-east-2:1e7cf9ee-03d7-4076-937b-bb4b9fac0f8f"
}

```

# 3. 调用 aws 接口 获取 AK/SK

https://cognito-identity.us-east-2.amazonaws.com/

## req

```json
{
  "IdentityId": "us-east-2:1e7cf9ee-03d7-4076-937b-bb4b9fac0f8f",
  "Logins": {
    "cognito-idp.us-east-2.amazonaws.com/{userPoolId}": "{id_token}"
  }
}

```

## resp

```
{
    "Credentials": {
        "AccessKeyId": "AccessKeyId",
        "Expiration": 1670042437,
        "SecretKey": "SecretKey",
        "SessionToken": "SessionToken"
    },
    "IdentityId": "us-east-2:1e7cf9ee-03d7-4076-937b-bb4b9fac0f8f"
}
```

# 4. 调用 aws 接口 获取 用户信息

https://cognito-identity.us-east-2.amazonaws.com/

## req

```jsoo
{
    "AccessToken": "{access_token}"
}

```

## resp

```json
{
  "UserAttributes": [
    {
      "Name": "sub",
      "Value": "b3cd04be-bcc5-43d4-a930-36453da69525"
    },
    {
      "Name": "email_verified",
      "Value": "true"
    },
    {
      "Name": "email",
      "Value": "415754188@qq.com"
    }
  ],
  "Username": "pool_user_1"
}
```

# 5. 调用api接口认证

## lambda

```python
def lambda_handler(event, context):

logger.info(f'event:{event}')
logger.info(f'context:{context}')

# headers 在 使用代理集成 apigateway 中才生效 , 并且 apigateway的认证信息会转发给 lambda
return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    },
    'body': json.dumps({
        'body': event.get('body'),
        'headers': event.get('headers'),
        'requestContext': event.get('requestContext'),
        'Unicorn': {'Name': 'Unicorn_Name'},
        'Eta': 1,
    })
}

```

## api_gateway cog auth : header 传递 Authorization : id_token

## api_gateway iam auth : 参考 https://docs.amazonaws.cn/general/latest/gr/sigv4-signed-request-examples.html, 如果是 临时角色 需要添加 x-amz-security-token

```
authorization: AWS4-HMAC-SHA256 Credential={AccessKeyId}/20221203/us-east-2/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-security-token, Signature=0ae6360ccd7ddd6bdccbfc7341e0741beeefc026d4ed9965fac3db0c6e7f6711
x-amz-date: 20221203T035401Z
x-amz-security-token: {SessionToken}
```

