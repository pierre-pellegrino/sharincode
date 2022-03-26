const HashtagLink = (props) => {
  const {
    children,
    contentState,
    decoratedText,
    blockKey,
    entityKey,
    offsetKey,
    ...rest
  } = props;
  return (
    <span {...rest} className="txt-primary">
      {children}
    </span>
  );
};

export default HashtagLink;
