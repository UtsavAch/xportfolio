import * as S from "./Card.Style";
import {
  UilMapMarker,
  UilExternalLinkAlt,
  UilGithubAlt,
  UilPlayCircle,
} from "@iconscout/react-unicons";

const Card = ({
  title,
  subtitle,
  meta,
  location,
  description,
  tags = [], // New prop: Array of strings ["React", "SQL"]
  links = {}, // New prop: { url: '...', github: '...' }
  children,
  extra,
}) => {
  return (
    <S.CardContainer>
      {(title || extra) && (
        <S.CardHeader>
          <div>
            {title && <S.Title>{title}</S.Title>}
            {location && (
              <S.Location
                style={{
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <UilMapMarker size="14" /> {location}
              </S.Location>
            )}
            {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
            {meta && <S.Meta>{meta}</S.Meta>}
          </div>

          {/* Typically used for dates or badges in top right */}
          {extra && <S.Meta>{extra}</S.Meta>}
        </S.CardHeader>
      )}

      {/* Subtle divider separating header from description */}
      <S.Divider />

      {description && <S.Description>{description}</S.Description>}

      {/* Custom content block */}
      {children && <div style={{ marginTop: "15px" }}>{children}</div>}

      {/* Footer for Tags and Links */}
      {(tags.length > 0 || links.url || links.github || links.video) && (
        <S.Footer>
          <S.TagsContainer>
            {tags.map((tag, index) => (
              <S.Tag key={index}>{tag}</S.Tag>
            ))}
          </S.TagsContainer>

          {/* Only show the vertical line if there are both tags AND links */}
          {tags.length > 0 && (links.url || links.github || links.video) && (
            <S.VerticalDivider />
          )}

          <S.ActionLinks>
            {links.video && (
              <a
                href={links.video}
                target="_blank"
                rel="noreferrer"
                title="View Video"
              >
                <UilPlayCircle size="20" />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                title="View Code"
              >
                <UilGithubAlt size="20" />
              </a>
            )}
            {links.url && (
              <a
                href={links.url}
                target="_blank"
                rel="noreferrer"
                title="Live Demo"
              >
                <UilExternalLinkAlt size="20" />
              </a>
            )}
          </S.ActionLinks>
        </S.Footer>
      )}
    </S.CardContainer>
  );
};

export default Card;
