import { FC, useState, KeyboardEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconArticle, IconBook, IconDots, IconPlus } from '@tabler/icons-react';
import scss from './Courses.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import DeleteCourses from '@/src/ui/customModal/deleteModal/DeleteCourse';
import EditCourse from '@/src/ui/customModal/EditCourse';
import CreateCourse from '@/src/ui/customModal/CreateCurse';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Courses: FC = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const { data } = useGetGroupQuery();
	const [saveId, setSaveId] = useState<null | number>(null);
	const [saveIdSrorege, setSaveIdStorege] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [openCurse, setOpen] = useState(false);
	const handleOpenCourse = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);
	const navigate = useNavigate();

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);
	const openPartFunc = () => {
		if (openPart >= 1) {
			setRowsPerPage(8);
			setOpenPage(8);
			setCurrentPage(openPart);
		}
	};
	const openPartPage = () => {
		if (rowsPerPage > 8) {
			setCurrentPage(1);
		}
	};

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 8) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(8);
			}
		}
	};
	localStorage.setItem('id', saveIdSrorege);

	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					<div className={scss.course_button_modal}>
						<Button
							size="large"
							className={scss.button}
							onClick={handleOpenCourse}
							variant="contained"
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Создать курс</span>
						</Button>
					</div>

					<h1 className={scss.title}>Курсы</h1>
					<div>
						<div className={scss.cards}>
							{data && Array.isArray(data) && data.length > 0 ? (
								<div className={scss.card}>
									{data
										.slice(
											(currentPage - 1) * rowsPerPage,
											currentPage * rowsPerPage
										)
										.map((item) => (
											<div
												key={item.id}
												className={scss.zero_block_container}
												// onClick={() => setSaveIdStorege(item.id)}
											>
												<div
													onClick={() => {
														setSaveIdStorege(item.id);
													}}
												>
													{
														// 		to={`/admin/courses/${item.id}/student`}
													}
													<div
														onClick={() => {
															// e.preventDefault();
															setSaveIdStorege(item.id); // Выполняем ваш обработчик\
															setTimeout(() => {
																navigate(`/admin/courses/${item.id}/teacher`);
															}, 1000);
														}}
													>
														<div className={scss.block_photo_cards}>
															<img src={item.img} alt="images" />
														</div>
														<div className={scss.block_cont}>
															<div className={scss.second_block}>
																<p className={scss.block_title}>{item.title}</p>
																<p className={scss.block_date}>{item.date}</p>
															</div>
															<div className={scss.text_card}>
																<span className={scss.block_text}>
																	{item.text && item.text.length > 60
																		? `${item.text.substring(0, 60)}...`
																		: item.text}
																</span>
															</div>
														</div>
													</div>
												</div>
												<div
													className={scss.block_button_div}
													onClick={() => {
														setSaveIdStorege(item.id);
													}}
												>
													<div onClick={handleClick}>
														<button
															className={scss.button_dots}
															onClick={() => {
																setSaveId(item.id);
															}}
														>
															<IconDots stroke={2} />
														</button>
													</div>
													{
														<Menu
															id="positioned-menu"
															anchorEl={anchorEl}
															open={open}
															onClose={handleClose}
															anchorOrigin={{
																vertical: 'top',
																horizontal: 'left'
															}}
															transformOrigin={{
																vertical: 'top',
																horizontal: 'left'
															}}
														>
															<MenuItem
																onClick={() => {
																	setOpenEditModal(true);
																	handleClose();
																}}
															>
																<img src={editImg} alt="#" />
																Редактировать
															</MenuItem>
															<MenuItem
																onClick={() => {
																	setDeleteModal(true);
																	handleClose();
																}}
															>
																<img src={deleteImg} alt="#" />
																Удалить
															</MenuItem>
														</Menu>
													}
												</div>
											</div>
										))}
									<EditCourse
										open={openEditModal}
										handleClose={handleCloseEditModal}
										saveId={saveId}
									/>
								</div>
							) : null}
							<DeleteCourses
								openModalDelete={deleteModal}
								closeModalDelete={() => setDeleteModal(false)}
								deleteById={saveId}
							/>
						</div>
					</div>
				</div>
				<div className={scss.pagination}>
					<div className={scss.Inputs}>
						<p className={scss.text}>Перейти на страницу</p>
						<div className={scss.pagination_element}>
							<IconBook stroke={2} />
						</div>
						<input
							type="text"
							value={openPart}
							onChange={(e) => setOpenPart(+e.target.value)}
							onKeyDown={(e) => {
								handleAppend(e);
								openPartFunc();
							}}
						/>
					</div>
					<div className={scss.stack}>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={Math.ceil(data!.length / rowsPerPage)}
								page={currentPage}
								onChange={handlePageChangeC}
								shape="rounded"
								variant="outlined"
							/>
						</Stack>
					</div>
					<div className={scss.Inputs}>
						<p className={scss.text}>Показать</p>
						<div className={scss.pagination_element}>
							<IconArticle stroke={2} />
						</div>
						<input
							type="text"
							value={openPage}
							onChange={(e) => setOpenPage(+e.target.value)}
							onKeyDown={(e) => {
								handleAppend(e);
								openPartPage();
							}}
						/>
					</div>
				</div>
			</div>

			<CreateCourse
				handleOpenCourse={handleOpenCourse}
				open={openCurse}
				handleClose={handleCloseCourses}
			/>
		</div>
	);
};

export default Courses;
