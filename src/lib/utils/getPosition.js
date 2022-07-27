const POSITION_MAP = {
	C: 'Center',
	LW: 'Left Wing',
	RW: 'Right Wing',
	D: 'Defense'
};

export const getPosition = (code) => {
	return POSITION_MAP[code];
};
