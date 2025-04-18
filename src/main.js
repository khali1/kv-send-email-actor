import { Actor, log } from "apify";

await Actor.init();

// Structure of input is defined in input_schema.json
const {
  kvStoreId,
  subjectOverride,
  textOverride,
  subjectKeyOverride,
  textKeyOverride,
  ...rest
} = await Actor.getInput();

const kvStore = await Actor.openKeyValueStore(
  kvStoreId || rest?.payload?.resource?.defaultKeyValueStoreId
);

if (!kvStore && !subjectOverride && !textOverride) {
  throw new Error("No KV store found");
}

const subject = subjectOverride || (await kvStore.getValue(subjectKeyOverride));
const text = textOverride || (await kvStore.getValue(textKeyOverride));

if (!subject) {
  throw new Error("No subject specified or found in KV store");
}
if (!text) {
  throw new Error("No text specified or found in KV store");
}

// Prepare email configuration
const emailPayload = {
  ...rest,
  subject,
  text,
};

// Call the send-mail actor
try {
  const result = await Actor.call("apify/send-mail", emailPayload);
  if (result.status !== "SUCCEEDED") {
    throw new Error(`Send-mail actor failed with status: ${result.status}`);
  }
  log.info("Email sent successfully");
} catch (error) {
  log.error("Failed to send email", error);
  throw error;
}

await Actor.exit();
