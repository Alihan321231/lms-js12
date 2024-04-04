import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/buttonPlus/Без заливки.svg';

interface CircleButtonProps {
	children: ReactNode;
	disabled: boolean;
}

const ButtonCircle: FC<CircleButtonProps> = ({ children, disabled }) => {
	return (
		<>
			<Button
				className={scss.CircleButton}
				disabled={disabled}
				variant="contained"
			>
				{children}
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
			</Button>
		</>
	);
};

export default ButtonCircle;
