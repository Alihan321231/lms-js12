import { FC } from 'react';
import scss from './Trash.module.scss';
import { IconDelete } from '@/src/assets/icons';
import { IconRefresh } from '@tabler/icons-react';
import { useGetTrashQuery } from '@/src/redux/api/admin/trash';
import { Preloader } from '../preloader/Preloader';

const Trash: FC = () => {
	const { data, isLoading } = useGetTrashQuery();

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	return (
		<div className={scss.TrashParent}>
			<h1>Корзина</h1>
			<div className={scss.TableContainer}>
				<div className={scss.TableAutomaticallyDeleted}>
					Элементы в корзине автоматически удаляются через 7 дней с момента
					добавления!
				</div>
				<div className={scss.Trash}>
					<table className={scss.Table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Date of delete</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((card, index) => (
									<tr
										// key={item._id}
										className={
											index % 2 === 1
												? scss.TableAlternateRow
												: '' || scss.TableContainerSecond
										}
									>
										<td className={scss.TableCell_main}>{card.name}</td>
										<td className={scss.TableCell}>{card.date}</td>
										<td className={scss.TableCell}>
											<div className={scss.icon}>
												<div>
													<IconRefresh />
												</div>
												<div>
													{' '}
													<IconDelete />
												</div>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Trash;
