import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import AppFooter from "src/components/layout/footers/AppFooter";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useAppSelector } from "src/store";

import Modal from "src/components/common/modal";

const profileInitialState = {
  name: "",
  introduction: "",
};
const passwordInitialState = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
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
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [profileInputs, setProfileInputs] = useState({
    ...profileInitialState,
    name: name ?? "",
    introduction: introduction ?? "",
  });
  const [passwordInputs, setPasswordInputs] = useState(passwordInitialState);

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInputs({
      ...profileInputs,
      [name]: value,
    });
  };
  const onChangePasswordInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInputs({
      ...passwordInputs,
      [name]: value,
    });
  };

  const onProfileSave = () => {};

  // const [isToggle, setIsToggle] = useState(true);
  // const onClose = () => {
  //   setIsToggle(false);
  // };

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
                      <div className="w-12 h-12 rounded-full snack-border"></div>
                    </div>
                    <div className="ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <h2 className="text-lg font-semibold">{user_id}</h2>
                        <p className="text-snack-sky text-sm">
                          <span className="cursor-pointer">이미지 변경</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="name" className="py-1.5 cursor-pointer text-sm ">
                        이름
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="name" className="snack-input" name="name" type="text" value={profileInputs.name} onChange={onChangeInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="introduction" className="py-1.5 cursor-pointer text-sm">
                        소개
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="introduction" className="snack-input" name="introduction" type="textarea" value={profileInputs.introduction} onChange={onChangeInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">회원님의 정보나 하고싶은 말을 입력해주세요.</div>
                    </div>
                  </div>
                  <footer className="flex justify-end">
                    <button className="snack-btn" onClick={onProfileSave}>
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
                <Typography>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="currentPassword" className="py-1.5 cursor-pointer text-sm">
                        현재 비밀번호
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="currentPassword" className="snack-input" name="currentPassword" type="textarea" value={passwordInputs.currentPassword} onChange={onChangePasswordInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">비밀번호 변경을 위해 회원님의 현재 비밀번호를 입력해주세요.</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="newPassword" className="py-1.5 cursor-pointer text-sm">
                        새 비밀번호
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input id="newPassword" className="snack-input" name="newPassword" type="textarea" value={passwordInputs.newPassword} onChange={onChangePasswordInputs} />
                      </div>
                      <div className="text-[#828282] text-xs">변경할 비밀번호를 입력해주세요.</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex md:justify-end  md:w-28">
                      <label htmlFor="newPasswordConfirmation" className="py-1.5 cursor-pointer text-sm">
                        새 비밀번호 확인
                      </label>
                    </div>
                    <div className="md:ml-4 w-full max-w-[300px]">
                      <div className="mb-2">
                        <input
                          id="newPasswordConfirmation"
                          className="snack-input"
                          name="newPasswordConfirmation"
                          type="textarea"
                          value={passwordInputs.newPasswordConfirmation}
                          onChange={onChangePasswordInputs}
                        />
                      </div>
                      <div className="text-[#828282] text-xs">변경할 비밀번호를 다시한번 입력해주세요.</div>
                    </div>
                  </div>
                  <footer className="flex justify-end">
                    <button className="snack-btn" onClick={onProfileSave}>
                      저장
                    </button>
                  </footer>
                </Typography>
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

      {/* Modal test */}
      {/* <Modal open={isToggle} onClose={onClose}>
        <div className=" max-w-[400px]">
          <header className="p-8">
            orem ipsum dolor sit amet consectetur, adipisicing elit. Quo sunt sed quae atque obcaecati facere voluptas, quas aspernatur mollitia ipsam, dolor officia, hic repellat! Quibusdam et a
            magnam accusantium distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa temporibus sunt nulla! Illum saepe expedita voluptatem, placeat rem tempore dolor. Doloremque,
            orem ipsum dolor sit amet consectetur, adipisicing elit. Quo sunt sed quae atque obcaecati facere voluptas, quas aspernatur mollitia ipsam, dolor officia, hic repellat! Quibusdam et a
          </header>
        </div>
      </Modal> */}

      <AppFooter />
    </AppTemplate>
  );
}
