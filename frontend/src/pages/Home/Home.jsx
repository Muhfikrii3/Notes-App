import { useState } from "react";
import NoteCards from "../../components/Cards/NoteCards";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import useEffectOnce from "../../hooks/customHook";
import Toast from "../../components/ToastMessage/Toast";

const Home = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState(null);
	const [allNotes, setAllNotes] = useState([]);

	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShow: false,
		type: "add",
		data: null,
	});

	const [toatsMessage, setToastMessage] = useState({
		isShow: false,
		message: "",
		type: "add",
	});

	const handleEdit = (noteDetails) => {
		setOpenAddEditModal({ isShow: true, data: noteDetails, type: "edit" });
	};

	const toastMessage = (message, type) => {
		setToastMessage({
			isShow: true,
			message,
			type,
		});
	};

	const handleCloseToast = () => {
		setToastMessage({
			isShow: false,
			message: "",
		});
	};

	const getUserInfo = async () => {
		try {
			const response = await axiosInstance.get("/api/user/get-user");
			if (response.data.data && response.data.data) {
				setUserInfo(response.data.data);
			}
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.clear();
				navigate("/login");
			}
		}
	};

	const getAllNotes = async () => {
		try {
			const response = await axiosInstance.get("api/notes/get-all-notes");

			if (response.data && response.data.data) {
				setAllNotes(response.data.data);
			}
		} catch (error) {
			console.log("An unexpected error occurred. Please try again.");
		}
	};

	const deleteNote = async (data) => {
		const noteId = data._id;
		try {
			const response = await axiosInstance.delete(
				"api/notes/delete-note/" + noteId
			);

			if (response.data && !response.data.error) {
				toastMessage("Note Deleted Successfully", "delete");
				getAllNotes();
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				console.log("An unexpected error occurred. Please try again.");
			}
		}
	};

	const pinnedNote = async (data) => {
		const noteId = data._id;
		try {
			const response = await axiosInstance.put(
				"api/notes/update-note-pinned/" + noteId,
				{
					isPinned: !data.isPinned,
				}
			);

			if (response.data && response.data.data) {
				toastMessage("Note Updated Successfully");
				getAllNotes();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffectOnce(() => {
		getAllNotes();
		getUserInfo();
		return () => {};
	}, []);

	return (
		<>
			<Navbar userInfo={userInfo} />

			<div className="container mx-auto">
				<div className="grid grid-cols-3 gap-4 mt-8">
					{allNotes.map((item) => (
						<NoteCards
							key={item._id}
							title={item.title}
							date={item.createdOn}
							content={item.content}
							tags={item.tags}
							isPinned={item.isPinned}
							onEdit={() => handleEdit(item)}
							onDelete={() => deleteNote(item)}
							onPinNote={() => pinnedNote(item)}
						/>
					))}
				</div>
			</div>
			<button
				className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
				onClick={() => {
					setOpenAddEditModal({
						isShow: true,
						type: "add",
						data: null,
					});
				}}
			>
				<MdAdd className="size-6 text-white" />
			</button>
			<Modal
				isOpen={openAddEditModal.isShow}
				onRequestClose={() => {}}
				style={{
					overlay: {
						backgroundColor: "rgba(0,0,0,0.2)",
					},
				}}
				contentLabel=""
				className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
			>
				<AddEditNote
					type={openAddEditModal.type}
					noteData={openAddEditModal.data}
					onClose={() => {
						setOpenAddEditModal({
							isShow: false,
							type: "add",
							data: null,
						});
					}}
					getAllNotes={getAllNotes}
					toastMessage={toastMessage}
				/>
			</Modal>
			<Toast
				isShow={toatsMessage.isShow}
				message={toatsMessage.message}
				type={toatsMessage.type}
				onClose={handleCloseToast}
			/>
		</>
	);
};

export default Home;
