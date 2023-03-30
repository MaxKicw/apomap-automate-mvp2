// @ts-nocheck
// grab the Mixpanel factory
import Mixpanel from 'mixpanel';

// create an instance of the mixpanel client
export const mixpanel = Mixpanel.init(
    "a821efc9aed6528bdd463def4d1e4523",
    {
      host: "api-eu.mixpanel.com",
    },
  );