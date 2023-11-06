import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import CategoryRow from "@/components/Index/Questions/CategoryRow";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { History } from "../Questions";
import { useEffect, useState } from "react";
import axios from "axios";
import { QUESTION_URI } from "@/constants/uri";

interface QuestionModalProps {
  handleCloseModal: () => void;
  setShowQuestionModal: (status: boolean) => void;
  history: History;
}

export default function QuestionModal({
  handleCloseModal,
  setShowQuestionModal,
  history,
}: QuestionModalProps) {
  const [title, setTitle] = useState<string>("Loading...");
  const [description, setDescription] = useState<string>("Loading...");
  const [difficulty, setDifficulty] = useState<string>("Loading...");
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      axios
        .get(`${QUESTION_URI.GET_BY_ID}/${history.questionid}`)
        .then((res) => {
          console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDifficulty(res.data.difficulty);
          setCategory(res.data.tags);
        })
        .catch((err) => {
          alert("Error getting question. Please try again later. " + err);
        });
    };
    fetchQuestion();
  }, []);

  const code = history.code;

  return (
    <Modal
      isOpen={true}
      onClose={() => setShowQuestionModal(false)}
      isCentered
      size="3xl"
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent
        className="overflow-auto"
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

          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <p className="font-poppins text-base tracking-tight text-pp-darkpurple">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Description
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </p>
              <AccordionPanel>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem overflow={"scroll"}>
              <p className="font-poppins text-base tracking-tight text-pp-darkpurple">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Code
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </p>
              <AccordionPanel>
                <SyntaxHighlighter showLineNumbers>{code}</SyntaxHighlighter>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </ModalContent>
    </Modal>
  );
}
