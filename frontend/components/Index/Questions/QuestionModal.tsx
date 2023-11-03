// import {
//   Center,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay,
// } from "@chakra-ui/react";
// interface SaveModalProps {
//   handleSave: () => void;
//   handleSaveAndLeave: () => void;
//   handleCloseModal: () => void;
//   setShowSaveModal: (status: boolean) => void;
// }

// export default function SaveModal({
//   handleSave,
//   handleSaveAndLeave,
//   handleCloseModal,
//   setShowSaveModal,
// }: SaveModalProps) {
//   return (
//     <Center>
//       <Modal isOpen={true} onClose={() => setShowSaveModal(false)} isCentered>
//         <ModalOverlay />
//         <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
//           <ModalHeader className="font-poppins text-pp-darkpurple">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={3}
//               stroke="currentColor"
//               className="w-6 h-6 text-pp-blue cursor-pointer mb-4"
//               onClick={handleCloseModal}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//               />
//             </svg>
//             Save changes?
//           </ModalHeader>

//           <ModalBody className="flex justify-between">
//             <button
//               onClick={handleSave}
//               className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-40 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleSaveAndLeave}
//               className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-40 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
//             >
//               Save & leave
//             </button>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Center>
//   );
// }
