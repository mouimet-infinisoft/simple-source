// You can customize this mock as needed for your Storybook stories
export const MockLink = ({ to, children, ...rest }) => {
  return <a href={to} {...rest}>{children}</a>;
};
