import * as S from "./Card.Style";
import {
  UilMapMarker,
  UilExternalLinkAlt,
  UilGithubAlt,
  UilPlayCircle,
  UilMultiply, // Import 'X' icon
} from "@iconscout/react-unicons";

const Card = ({
  title,
  subtitle,
  meta,
  location,
  description,
  tags = [],
  links = {},
  children,
  extra,
  onTagDelete, // [New Prop] Handler for deleting a tag
}) => {
  return (
    <S.CardContainer>
      {/* ... (Keep Header, Divider, Description logic exactly as is) ... */}

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
          {extra && <S.Meta>{extra}</S.Meta>}
        </S.CardHeader>
      )}

      <S.Divider />

      {description && <S.Description>{description}</S.Description>}
      {children && <div style={{ marginTop: "15px" }}>{children}</div>}

      {(tags.length > 0 || links.url || links.github || links.video) && (
        <S.Footer>
          <S.TagsContainer>
            {tags.map((tag, index) => {
              const tagName = typeof tag === "string" ? tag : tag.name;

              return (
                <S.Tag key={tag.id || index}>
                  {tagName}
                  {onTagDelete && (
                    <S.DeleteTagIcon
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Prevents clicking the tag from clicking the card
                        onTagDelete(tag);
                      }}
                    >
                      <UilMultiply size="14" />
                    </S.DeleteTagIcon>
                  )}
                </S.Tag>
              );
            })}
          </S.TagsContainer>

          {tags.length > 0 && (links.url || links.github || links.video) && (
            <S.VerticalDivider />
          )}

          <S.ActionLinks>
            {/* ... Keep existing links logic ... */}
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
