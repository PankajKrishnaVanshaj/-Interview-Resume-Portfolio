import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { chatSession } from "@/utils/GeminiAIModal";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const PROMPT =
  "position title: {positionTitle} , Depending on the position title, give me 5-7 bullet points for my experience in a resume (Please do not add experience level and No JSON array), and give me the result in HTML tags";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      const updatedExperience = [...resumeInfo.experience];
      updatedExperience[index].workSummery = value;
      setResumeInfo({
        ...resumeInfo,
        experience: updatedExperience,
      });
    }
  }, [value]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      // toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      setValue(responseText);
    } catch (error) {
      console.error("Error generating summary:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
