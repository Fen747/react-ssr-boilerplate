import styled from 'styled-components';

const Box = styled.div`
	display: flex;
`;

const Line = Box.extend`
	align-items: center;
	justify-content: space-between;
`;

const Wrap = Box.extend`
	flex-wrap: wrap;
`;

const WrapLine = Line.extend`
	flex-wrap: wrap;
`;

const Item = styled.div`
	flex-grow:1;
	width: 50%;
	padding: 0.5rem;

	@media (max-width: 1024px) {
		width: 100%;
	}
`;

export default {
	WrapLine,
	Wrap,
	Line,
	Item,
	Box,
};