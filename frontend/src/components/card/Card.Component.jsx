import * as S from "./Card.Style";

const Card = ({ title, subtitle, meta, description, children, extra }) => {
  return (
    <S.CardContainer>
      {(title || extra) && (
        <S.CardHeader>
          <div>
            {title && <S.Title>{title}</S.Title>}
            {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
            {meta && <S.Meta>{meta}</S.Meta>}
          </div>
          {extra && <div>{extra}</div>}
        </S.CardHeader>
      )}

      {description && <S.Description>{description}</S.Description>}

      {/* For custom content like video players, icons, or specific grid layouts */}
      {children && <div style={{ marginTop: "15px" }}>{children}</div>}
    </S.CardContainer>
  );
};

export default Card;
