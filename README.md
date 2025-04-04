# KV Send Mail Actor

This actor is a wrapper around Apify's [send-mail actor](https://apify.com/apify/send-mail) that allows you to send emails using content stored in a Key-Value store.

## Features

- Reads email subject and content from a Key-Value store
- Supports all standard email features (CC, BCC, Reply-To)
- Includes a mock mode for testing
- Simple and easy to use

## Input

The actor accepts the following input parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| kvStoreId | string | No | ID of the KV store containing email data. The store must have two keys: 'subject' and 'text' |
| to | string | Yes | Email address of the recipient(s). Multiple addresses can be comma-separated |
| cc | string | No | CC recipients (comma-separated) |
| bcc | string | No | BCC recipients (comma-separated) |
| replyTo | string | No | Reply-to email address |
| isMock | boolean | No | If true, logs the process but doesn't send the email (for testing) |

## KV Store Requirements

The Key-Value store must contain two keys:
- `subject`: The email subject line
- `text`: The email body content

## Example Input

```json
{
    "kvStoreId": "abc123",
    "to": "recipient@example.com",
    "cc": "cc@example.com",
    "bcc": "bcc@example.com",
    "replyTo": "reply@example.com",
    "isMock": false
}
```

## Usage

1. Create a Key-Value store with your email content or within a integration the default one is used
2. Run the actor with the required parameters
3. The actor will read the content from the KV store and send the email using Apify's send-mail actor

## Notes

- The actor uses Apify's send-mail actor under the hood
- For testing purposes, you can set `isMock` to true to see the email content without actually sending it
- Multiple email addresses in to/cc/bcc fields should be comma-separated
