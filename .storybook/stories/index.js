import { storiesOf } from '@storybook/vue';
import { linkTo } from '@storybook/addon-links';
import { Button, Icon } from '@/src/components';
import Welcome from './Welcome.vue';

export const stories = () => {
  storiesOf('페이지', module)
    .add('로그인', () => ({
      components: { Welcome },
      template: '<welcome :showApp="action" />',
      methods: { action: linkTo('Button') }
    }))
    .add('채널목록', () => ({
      components: { Welcome },
      template: '<welcome :showApp="action" />',
      methods: { action: linkTo('Button') }
    }))
    .add('채팅창', () => ({
      components: { Welcome },
      template: '<welcome :showApp="action" />',
      methods: { action: linkTo('Button') }
    }));

  storiesOf('컴포넌트', module)
    .add('버튼', () => ({
      components: { Button, Icon },
      template: '<x-button>button</x-button>'
    }))
    .add('아이콘', () => ({
      components: { Button, Icon },
      template: '<x-icon>icon</x-icon>'
    }))
    .add('채팅뷰어', () => ({
      components: { Button, Icon },
      template: '<x-icon>icon</x-icon>'
    }))
    .add('채팅입력기', () => ({
      components: { Button, Icon },
      template: '<x-icon>icon</x-icon>'
    }));
};
