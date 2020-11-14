import { rem } from "polished";
import styled from "styled-components";
import { grid, size } from "../../ui/theme";

export const Container = styled.div`
  max-width: ${rem(grid.contentMaxWidth)};
  margin: 0 auto;
  padding: 0 ${rem(size.large)};
`;
