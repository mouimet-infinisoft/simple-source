import Avatar from '../../components/atoms/Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // initialItems: Array,
    // placeholder: String,
    // onItemsChange: () => {},
  },
  args: {
    // initialItems: ['Hello', 'World'],
    // placeholder: 'My name ',
  },
};

export const Default = {
  args: {},
};
