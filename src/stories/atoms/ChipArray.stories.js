import ChipArray from '../../components/atoms/ChipArray';
import '../../assets/css/remixicon.css';
import '../../scss/style.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/ChipArray',
  component: ChipArray,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    initialItems: Array,
    placeholder: String,
    onItemsChange: () => {},
  },
  args: {
    initialItems: ['Hello', 'World'],
    placeholder: 'My name ',
  },
};

export const Default = {
  args: {},
};
