import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";

const Home = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

	const updateHandler = async (id) => {
		try {
			const { data } = await axios.put(
				`${SERVER}/task/${id}`,
				{},
				{
					withCredentials: true,
				}
			);
            setRefresh(prev => !prev);
			toast.success(data.message);
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};

	const deleteHandler = async (id) => {
		try {
			const { data } = await axios.delete(`${SERVER}/task/${id}`, {
				withCredentials: true,
			});
            setRefresh(prev => !prev);
			toast.success(data.message);
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${SERVER}/task/new`,
				{
					title,
					description,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

            setRefresh(prev => !prev);
			setTitle("");
			setDescription("");
			toast.success(data.message);
			setLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		axios
			.get(`${SERVER}/task/my`, {
				withCredentials: true,
			})
			.then((res) => {
				setTasks(res.data.tasks);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	}, [refresh]);

	return (
		<div className="container">
			<div className="login">
				<section>
					<form onSubmit={submitHandler}>
						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<button disabled={loading} type="submit">
							Add Task
						</button>
					</form>
				</section>
			</div>

			<section className="todosContainer">
				{tasks.map((task) => (
					<TodoItem
						key={task._id}
						title={task.title}
						description={task.description}
						isCompleted={task.isCompleted}
						updateHandler={updateHandler}
						deleteHandler={deleteHandler}
						id={task._id}
					/>
				))}
			</section>
		</div>
	);
};

export default Home;
