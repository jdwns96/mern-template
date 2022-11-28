import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import AppFooter from "src/components/layout/footers/AppFooter";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useAppSelector } from "src/store";

const profileInitialState = {
  name: "",
  introduction: "",
};

const ACCORDION_STYLE = {
  backgroundColor: "inherit",
  color: "inherit",
  ".MuiAccordionSummary-expandIconWrapper": {
    color: "inherit",
  },
};

export default function AccountPage() {
  const { id, user_id, name, introduction } = useAppSelector((store) => store.auth);

  // mui accordion example
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [profileInputs, setProfileInputs] = useState({
    ...profileInitialState,
    name: name ?? "",
    introduction: introduction ?? "",
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInputs({
      ...profileInputs,
      [name]: value,
    });
  };
  const onProfileSave = () => {};

  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-3xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-4 dark:bg-[#3D3D3D]">
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} sx={ACCORDION_STYLE}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>
                  <h1 className="text-lg font-semibold">
                    <span>프로필 편집</span>
                  </h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="flex flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <div className="w-12 h-12 rounded-full choco-border"></div>
                    </div>
                    <div className="ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <h2 className="text-lg font-semibold">{user_id}</h2>
                        <p className="text-choco-sky text-sm">
                          <span className="cursor-pointer">이미지 변경</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="name" className="py-1.5 cursor-pointer">
                        이름
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="name" className="choco-input" name="name" type="text" value={profileInputs.name} onChange={onChangeInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="introduction" className="py-1.5 cursor-pointer">
                        소개
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="introduction" className="choco-input" name="introduction" type="textarea" value={profileInputs.introduction} onChange={onChangeInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">회원님의 정보나 하고싶은 말을 입력해주세요.</div>
                    </div>
                  </div>
                  <footer className="flex justify-end">
                    <button className="choco-btn" onClick={onProfileSave}>
                      저장
                    </button>
                  </footer>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </article>
          <article className="bg-white shadow-md rounded-md mb-4 dark:bg-[#3D3D3D]">
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")} sx={ACCORDION_STYLE}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>
                  <h1 className="text-lg font-semibold">
                    <span>비밀번호 변경</span>
                  </h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography></Typography>
              </AccordionDetails>
            </Accordion>
          </article>
          <article className="bg-white shadow-md rounded-md mb-4 dark:bg-[#3D3D3D]">
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")} sx={ACCORDION_STYLE}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>
                  <h1 className="text-lg font-semibold">
                    <span>계정 관리</span>
                  </h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography></Typography>
              </AccordionDetails>
            </Accordion>
          </article>
        </div>
      </div>

      <AppFooter />
    </AppTemplate>
  );
}
