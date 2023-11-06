import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import CategoryRow from "@/components/Index/Questions/CategoryRow";

interface QuestionModalProps {
  handleCloseModal: () => void;
  setShowQuestionModal: (status: boolean) => void;

  // NOTE: remove and replace these props later with proper history linked
  title: string;
  description: string;
  difficulty: string;
  category: string[];
  date: string;
}

export default function QuestionModal({
  handleCloseModal,
  setShowQuestionModal,
  title,
  description,
  difficulty,
  category,
  date,
}: QuestionModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={() => setShowQuestionModal(false)}
      isCentered
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        style={{ padding: "20px", borderRadius: "20px" }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-pp-blue cursor-pointer"
            onClick={handleCloseModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-y-2 py-4">
          <h2 className="font-poppins text-2xl font-bold text-pp-darkpurple tracking-tight">
            {title}
          </h2>

          <div className="flex flex-row space-x-1">
            {category.map((item) => (
              <CategoryRow category={item} />
            ))}
          </div>
          <div className="overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        {/* TODO: add in the actual code they wrote */}
      </ModalContent>
    </Modal>
  );
}
