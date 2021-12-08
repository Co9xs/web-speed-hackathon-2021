const FontAwesomeIcon = ({ iconType, styleType }) => {
  return (
    <svg className="font-awesome inline-block leading-none fill-current">
      <use xlinkHref={`/sprites/font-awesome/${styleType}.svg#${iconType}`} />
    </svg>
  );
};

export { FontAwesomeIcon };
