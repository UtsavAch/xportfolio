import styled from "styled-components";

export const StyledGrid = styled.div`
  display: grid;
  /* Use the passed columns or default to 2 */
  grid-template-columns: repeat(${(props) => props.$columns || 2}, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;

  /* Dynamic centering: 
     If the last child is the first item in a new row, 
     make it span all columns and center it.
  */
  & > *:last-child:nth-child(${(props) => props.$columns || 2}n + 1) {
    grid-column: 1 / span ${(props) => props.$columns || 2};
    justify-self: center;
    width: 100%;
    /* Maintains consistent card size. 
       Formula: (100% / columns) - (gap adjustment)
    */
    max-width: calc((100% / ${(props) => props.$columns || 2}) - 0.75rem);
  }

  @media (max-width: 1100px) and (min-width: 901px) {
    /* Optional: reduce columns to 2 if you set a high number like 4 */
    grid-template-columns: repeat(
      ${(props) => Math.min(props.$columns, 2)},
      1fr
    );
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    & > *:last-child:nth-child(odd),
    & > *:last-child:nth-child(even) {
      grid-column: auto;
      max-width: 100%;
    }
  }
`;

// import styled from "styled-components";

// export const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;
//   margin-top: 1rem;

//   /* Centering logic for odd number of items */
//   & > *:last-child:nth-child(odd) {
//     grid-column: 1 / span 2;
//     justify-self: center;
//     width: 100%;
//     /* Keep width consistent with the 2-column layout */
//     max-width: calc(50% - 0.75rem);
//   }

//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;

//     & > *:last-child:nth-child(odd) {
//       grid-column: auto;
//       max-width: 100%;
//     }
//   }
// `;
