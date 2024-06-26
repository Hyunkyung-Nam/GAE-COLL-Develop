const { Project, ProjectFile, Board, ProjectMember, User } = require("../models");
const jwt = require("jsonwebtoken");

var fs = require("fs");
const { default: axios } = require("axios");
const { type } = require("os");
//프로젝트 생성
exports.createProject = async (req, res) => {
    try {
        const file = req.file;
        const my_id = req.userId;

        const { project_name, start_date, end_date, overview, rule, member_id, send_img } = req.body;
        let userId = [];

        //사진을 보냈는데 이미지 파일이 아니면 보드 생성 실패

        if (send_img === true && file === undefined) {
            res.json({ success: false, result: { message: "파일업로드에 실패하였습니다." } });
            return;
        }
        userId.push(my_id);
        //멤버가 object타입인지 string타입인지 구별 -> 포스트맨 테스트로 인해 처리
        if (typeof member_id === "object" || typeof member_id === "array") {
            for (id of member_id) {
                userId.push(id);
            }
        } else if (typeof member_id === "string") {
            for (id of JSON.parse(member_id)) {
                userId.push(id);
            }
        }
        const result = [];
        let project_img;

        if (file !== undefined) {
            project_img = file.filename;
        }
        //프로젝트 생성
        const createProjectResult = await Project.create({
            project_name,
            start_date,
            end_date,
            project_img,
            overview,
            rule: JSON.stringify(rule),
        });
        //프로젝트 멤버DB에 추가
        for (let i = 0; i < userId.length; i++) {
            const addProjectMemberResult = await ProjectMember.create({
                projectId: Number(createProjectResult.id),
                userId: Number(userId[i]),
            });
        }
        //프로젝트 파일 생성
        const createProjectFileResult = await ProjectFile.create({
            projectId: Number(createProjectResult.id),
        });

        //토큰에 projectID까지 넣어주기.
        const token = jwt.sign({ id: my_id, projectId: createProjectResult.id }, process.env.DEVEL_SECRET, {
            expiresIn: "24h",
        });
        res.json({ success: true, result: "", token });
    } catch (error) {
        console.log("프로젝트생성에러", error);
        res.json({ success: false, result: error });
    }
};

exports.getMyBoard = async (req, res) => {
    try {
        const userId = req.userId;

        // 사용자가 참여 중인 프로젝트 조회
        const getProjectId = await ProjectMember.findAll({
            where: { userId },
            attributes: ["projectId"],
            order: [["projectId", "ASC"]],
        });

        //프로젝트 아이디값만 배열로 저장
        const myProjectIds = getProjectId.map((project) => project.projectId);

        const boards = [];
        //보드테이블에서 projectid 에 해당하는 값불러오고 해당 프로젝트의 이름 및 id 함께 배열네 넣음
        for (projectId of myProjectIds) {
            const boardDatas = await Board.findAll({
                where: { projectId },
                attributes: ["id", "title", "status", "deadline"],
                include: [{ model: Project, attributes: ["project_name", "id"] }], // 멤버의 이름을 가져오기 위해 User 모델을 include
            });
            //배열안에 객체배열 넣지 않으려고 따로 객체만 넣어줌
            boardDatas.map((value) => boards.push(value));
        }
        res.json({ success: true, result: boards });
    } catch (error) {
        console.error("내 보드 조회 실패:", error);
        res.json({ success: false, result: "내 보드 조회 실패" });
    }
};

//사용자가 참여 중인 모든 프로젝트 조회
exports.getMyProject = async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findByPk(id);
        const { user_name, github, blog } = user;
        const projectId = await ProjectMember.findAll({
            where: { userId: user.id },
            attributes: ["projectId"],
            order: [["projectId", "ASC"]],
        });

        const project_ids = projectId.map((project_member) => project_member.dataValues.projectId);

        let projectResult = [];
        //객체배열로 프로젝트정보 (프로젝트아이디,프로젝트 이름, 상태, 프로젝트 이미지)
        for (let i = 0; i < project_ids.length; i++) {
            let id = project_ids[i];
            const getProjectInfotResult = await Project.findOne({
                where: { id },
                attributes: ["id", "project_name", "status", "project_img", "start_date", "end_date"],
            });

            projectResult.push(getProjectInfotResult);
        }
        res.json({ success: true, result: { user_name, github, blog, projectResult } });
    } catch (error) {
        res.json({ success: false, result: "프로젝트 조회 실패" });
    }
};

//팀원 보드 조회 (사용자가 참여 중인 모든 프로젝트 멤버들의 보드)
exports.getMyTeamBoard = async (req, res) => {
    try {
        const userId = req.userId;

        // 현재 사용자가 참여 중인 프로젝트 조회
        const projects = await ProjectMember.findAll({
            where: { userId },
            attributes: ["projectId"],
        });

        // 해당 프로젝트에 참여 중인 모든 팀원의 정보를 찾기
        const projectMembers = await ProjectMember.findAll({
            where: { projectId: projects.map((project) => project.projectId) },
            include: [{ model: User, attributes: ["user_name"] }], // 멤버의 이름을 가져오기 위해 User 모델을 include
        });

        // 각 팀원별로 프로젝트의 보드를 조회하고 결과를 담을 배열 초기화
        let teamBoards = [];

        // 각 팀원별로 프로젝트의 보드 조회
        for (let i = 0; i < projectMembers.length; i++) {
            const getBoardResult = await Board.findAll({
                where: { projectId: projectMembers[i].projectId, userId: projectMembers[i].userId },
                include: [{ model: Project }],
            });
            for (result of getBoardResult) {
                const board = {
                    deadline: result.deadline,
                    description: result.description,
                    id: result.id,
                    projectId: result.projectId,
                    status: result.status,
                    title: result.title,
                    userId: result.userId,
                    user_name: projectMembers[i].user.user_name,
                    project_img: result.project.project_img,
                    updatedAt: result.updatedAt,
                    project_name: result.project.project_name,
                };
                teamBoards.push(board);
            }
        }

        res.json({ success: true, result: teamBoards });
    } catch (error) {
        console.log("팀보드조회 실패", error);
        res.json({ success: false, result: "팀 보드 조회 실패" });
    }
};

//프로젝트 정보 조회
exports.getProjectInfo = async (req, res) => {
    try {
        const id = req.projectId;
        const memberData = [];
        const getProjectInfotResult = await Project.findOne({
            where: { id },
        });
        //프로젝트 멤버id, 이름 및 사진 보내기
        const getProjectMembertResult = await ProjectMember.findAll({
            where: { projectId: id },
        });
        for (let i = 0; i < getProjectMembertResult.length; i++) {
            const getUserInfo = await User.findOne(
                { where: { id: Number(getProjectMembertResult[i].userId) } },
                { attributes: ["user_name", "user_img"] }
            );
            const data = {
                user_name: getUserInfo.user_name,
                user_img: getUserInfo.user_img,
                id: getProjectMembertResult[i].userId,
            };
            memberData.push(data);
        }
        const { project_name, status, start_date, end_date, github, overview, rule, project_img } =
            getProjectInfotResult;

        const result = {
            project_name,
            status,
            start_date,
            end_date,
            github,
            overview,
            rule,
            project_img,
            member: memberData,
        };
        res.json({ success: true, result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
//프로젝트 파일 조회
exports.getProjectFile = async (req, res) => {
    const id = req.projectId;

    try {
        const getProjectFileResult = await ProjectFile.findOne({
            where: { id },
        });
        if (getProjectFileResult !== null) {
            res.json({ success: true, result: getProjectFileResult });
        } else {
            res.json({ success: true, result: { plan: "[]", erd: "[]", api: "[]" } });
        }
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 로그 조회
exports.projectLog = async (req, res) => {
    const id = req.projectId;
    const teamLog = [];
    try {
        const getBoardLogResult = await Board.findAll({
            where: { projectId: id },
        });
        for (let board of getBoardLogResult) {
            const userData = await User.findOne({
                where: { id: Number(board.userId) },
                attributes: ["user_img", "user_name"],
            });
            const data = {
                boardId: board.id,
                title: board.title,
                boardStatus: board.status,
                deadline: board.deadline,
                description: board.description,
                updatedAt: board.updatedAt,
                user_img: userData.user_img,
                user_name: userData.user_name,
            };
            teamLog.push(data);
        }
        res.json({ success: true, result: teamLog });
    } catch (error) {
        console.log(error);
        res.json({ success: true, result: error });
    }
};

//프로젝트 이름 수정
exports.updateProjectName = async (req, res) => {
    const id = req.projectId;
    const { project_name } = req.body;
    try {
        const updateProjectResult = await Project.update({ project_name }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
//프로젝트 이미지 수정
exports.updateProjectImg = async (req, res) => {
    const id = req.projectId;

    const file = req.file;
    console.log("프로젝트 이미지", req.file);
    if (file === undefined) {
        res.json({ success: false, result: { message: "파일업로드에 실패하였습니다." } });
        return;
    }
    //이전에 올렸던 이미지 삭제
    deleteImg(id);
    console.log(file);
    try {
        const updateProjectResult = await Project.update({ project_img: file.filename }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 상태 수정
exports.updateProjectStatus = async (req, res) => {
    const id = req.projectId;
    const { status } = req.body;

    try {
        const updateProjectResult = await Project.update({ status }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 기간 수정
exports.updateProjectperiod = async (req, res) => {
    const id = req.projectId;
    const { start_date, end_date } = req.body;
    try {
        const updateProjectResult = await Project.update(
            { start_date: String(start_date), end_date: String(end_date) },
            { where: { id } }
        );
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 overview 수정
exports.updateProjectOverview = async (req, res) => {
    const id = req.projectId;
    const { overview } = req.body;

    try {
        const updateProjectResult = await Project.update({ overview }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 규칙 수정
exports.updateProjectRule = async (req, res) => {
    const id = req.projectId;
    const { rule } = req.body;
    console.log(req.body);
    try {
        const updateProjectResult = await Project.update({ rule: JSON.stringify(rule) }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 멤버 추가
exports.addProjectMember = async (req, res) => {
    const id = req.projectId;
    const { member_id } = req.body;

    let userId;
    let result = [];

    if (typeof member_id === "object" || typeof member_id === "array") {
        userId = member_id;
    } else if (typeof member_id === "string") {
        userId = JSON.parse(member_id);
    }
    try {
        //프로젝트 멤버DB에 없으면 추가
        for (let i = 0; i < userId.length; i++) {
            console.log(id, userId[i]);
            const findProjectMemberResult = await ProjectMember.findAll({
                where: {
                    projectId: Number(id),
                    userId: Number(userId[i]),
                },
            });

            if (findProjectMemberResult.length === 0) {
                const addProjectMemberResult = await ProjectMember.create({
                    projectId: Number(id),
                    userId: Number(userId[i]),
                });
                result.push(addProjectMemberResult);
                console.log("result");
            }
        }
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 멤버 삭제
exports.deleteProjectMember = async (req, res) => {
    const id = req.projectId;
    const { member_id } = req.body;

    try {
        const addProjectMemberResult = await ProjectMember.destroy({
            where: {
                projectId: Number(id),
                userId: Number(member_id),
            },
        });
        res.json({ success: true, result: "" });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};
//프로젝트 파일 업로드
exports.updateProjectFile = async (req, res) => {
    const files = req.files;
    const id = req.projectId;
    const { type } = req.body;
    let fileName = [];
    try {
        const getProjectFileResult = await ProjectFile.findOne({
            where: { id },
        });
        if (JSON.parse(getProjectFileResult[type]) !== null && getProjectFileResult[type] !== "") {
            const beforeFiles = JSON.parse(getProjectFileResult[type]);
            for (let i = 0; i < beforeFiles.length; i++) {
                fileName.push(beforeFiles[i]);
            }
        }

        if (files !== undefined) {
            for (let i = 0; i < files.length; i++) {
                fileName.push(files[i].filename);
            }
        }

        let updateProjectFileResult;
        if (type === "erd") {
            updateProjectFileResult = await ProjectFile.update(
                { erd: JSON.stringify(fileName) },
                {
                    where: { projectId: Number(id) },
                }
            );
        } else if (type === "plan") {
            updateProjectFileResult = await ProjectFile.update(
                { plan: JSON.stringify(fileName) },
                {
                    where: { projectId: Number(id) },
                }
            );
        } else if (type === "api") {
            updateProjectFileResult = await ProjectFile.update(
                { api: JSON.stringify(fileName) },
                {
                    where: { projectId: Number(id) },
                }
            );
        }

        res.json({ success: true, result: updateProjectFileResult });
    } catch (error) {
        console.log("파일업로드 에러", error);
        res.json({ success: false, result: error });
    }
};

//프로젝트 깃허브 수정
exports.updateProjectGithub = async (req, res) => {
    const id = req.projectId;
    const { github } = req.body;

    try {
        const updateProjectResult = await Project.update({ github }, { where: { id } });
        res.json({ success: true, result: updateProjectResult });
    } catch (error) {
        res.json({ success: false, result: error });
    }
};

//프로젝트 파일 삭제
exports.deleteFile = async (req, res) => {
    const id = req.projectId;
    const { type, project_file } = req.body;

    try {
        //디비에서 file배열가져오기
        const getProjectFiletResult = await ProjectFile.findOne({
            where: { projectId: id },
        });

        //가져온 데이터 중 type에 해당하는거 data에 저장 및 배열로 파싱
        let data = getProjectFiletResult[String(type)];
        data = JSON.parse(data);
        //파일이 존재하면 삭제
        if (fs.existsSync("./public/uploads/project_file/" + data[Number(project_file)].trim())) {
            fs.unlinkSync("./public/uploads/project_file/" + data[Number(project_file)].trim());
        } else {
        }
        //삭제한 파일 배열에서 삭제하고 다시 디비에 저장
        data.splice(Number(project_file), 1);

        data = JSON.stringify(data);

        if (type === "api") {
            const updateProjectFileResult = await ProjectFile.update(
                { api: data },
                {
                    where: { projectId: id },
                }
            );
        } else if (type === "erd") {
            const updateProjectFileResult = await ProjectFile.update(
                { erd: data },
                {
                    where: { projectId: id },
                }
            );
        } else if (type === "plan") {
            const updateProjectFileResult = await ProjectFile.update(
                { plan: data },
                {
                    where: { projectId: id },
                }
            );
        }
        res.json({ success: true, result: "성공" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

//이미지 삭제 함수
async function deleteImg(projectId) {
    try {
        const getProjectInfotResult = await Project.findOne({
            where: { id: projectId },
        });
        if (fs.existsSync("./public/uploads/project/" + getProjectInfotResult.project_img)) {
            // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
            fs.unlinkSync("./public/uploads/project/" + getProjectInfotResult.project_img);
        }
    } catch (error) {
        console.log(error);
    }
}

//토큰 업데이트 함수
exports.UpdateToken = async (req, res) => {
    const { projectId } = req.body;
    const my_id = req.userId;
    try {
        const token = jwt.sign({ id: my_id, projectId }, process.env.DEVEL_SECRET, {
            expiresIn: "24h",
        });
        res.json({ success: true, result: "", token });
    } catch (error) {
        res.json({ success: true, result: error });
    }
};
