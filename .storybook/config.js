import { configure } from '@storybook/vue';
import { stories } from './stories';

(async () => {
  const resultstories = await stories();

  configure(resultstories, module);
})();
