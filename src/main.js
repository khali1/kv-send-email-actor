import { Actor } from 'apify';

await Actor.init();

// Structure of input is defined in input_schema.json
const { kvStoreId, ...rest }  = await Actor.getInput();

const kvStore = await Actor.openKeyValueStore(kvStoreId || rest?.payload?.resource?.defaultDatasetId);

if (!kvStore) {
    throw new Error('No KV store found');
}

const subject = await kvStore.getValue('subject');
const text = await kvStore.getValue('text');

if (!subject || !text) {
    throw new Error('No email data found in KV store');
}

// Prepare email configuration
const emailPayload = {
    ...rest,
    subject,
    text,
};

// Call the send-mail actor
await Actor.call('apify/send-mail', {
    input: emailPayload
});

await Actor.exit();
