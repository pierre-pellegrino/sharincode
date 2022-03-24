const HashtagLink = props => {
  return (
    <span {...props} className="txt-primary">
      {props.children}
    </span>
  );
};

export default HashtagLink;
