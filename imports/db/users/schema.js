import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    _id: { type: String },
    username: { type: String, optional: true },
    createdAt: { type: Date },

    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    
    services: { type: Object, blackbox: true },

    roles: { type: Array, optional: true },
    "roles.$": { type: String },
});