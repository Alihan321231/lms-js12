import notCreated from '@/src/assets/notCreated0.png';
import scss from './NotCreated.module.scss';
import { FC } from 'react';
import { Button } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

interface NotCreatedProps {
	text: string;
	name: string;
	buttonClick: () => void;
	buttontText: string;
}

const NotCreated: FC<NotCreatedProps> = ({
	text,
	name,
	buttonClick,
	buttontText
}) => {
	return (
		<div className={scss.mainNot}>
			<h2>{name}</h2>
			<div className={scss.not_created}>
				<div>
					<img className={scss.img} src={notCreated} alt="" />
				</div>
				<div>
					<h3>{text}</h3>
				</div>
				<div>
					<Button
						style={{ display: 'flex', gap: '10px' }}
						size="large"
						onClick={buttonClick}
						variant="contained"
					>
						<IconPlus stroke={2} />
						{buttontText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotCreated;
