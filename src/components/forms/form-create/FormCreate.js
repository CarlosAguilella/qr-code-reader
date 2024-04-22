import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DateTime } from "luxon";
import { useWindowSize } from '../../hooks/useWindowSize';
import { v4 as uuidv4 } from 'uuid';

import FormData from "./FormData";
import FormDescriptions from "./FormDescriptions";
import FormCourse from "./FormCourse";
import FormTicket from "./FormTicket";
import FormCat from "./FormCat";

import "./formCreate.css";

const FormCreate = ({ valueSelected, setValueSelected, magicArray, setMagicArray }) => {
    const inputRef = useRef();
    const { width } = useWindowSize();
    const uniqueId = uuidv4();
    const smallId = uniqueId.slice(0, 6);
    // const randomIdNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], randomIdChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const [formCreate, setFormCreate] = useState({
        // id: randomIdNum.sort(() => Math.random() - 0.5).slice(0, 3).join('') + '-' + randomIdChar.sort(() => Math.random() - 0.5).slice(0, 3).join(''),
        id: smallId,
        tipo: valueSelected,
        producto: "",
        accesos: 0,
        sociosValue: true,
        socios: "SI",
        precio: 0,
        stock: 0,
        expiracion: DateTime.now().plus({ days: 1 }).toISODate(),
        visible: false,
        deleted: false,
        preview: false,
        visible: false,
        smallDescEs: "",
        largeDescEs: "",
        smallDescVal: "",
        largeDescVal: "",
        unlimited: true,
        eventNumber: 45,
        free: true,
        eventPrice: 3,
        exclusive: true,
        startDate: "",
        endingDate: "",
        image: null,
        winterProgram: false,
        summerProgram: false,
        adultsProgram: false,
        poolProgram: false,
        childrenProgram: false,
        duration: "",
        ageDescription: "",
        poolProgramOption: "",
        memberFree: true,
        memberDues: 0,
        nonMemberFree: true,
        nonMemberDues: 0,
        payment: false,
        duesNumber: 1,
        duesInfo: [],
        preStartingDate: "",
        preEndingDate: "",
        ticketPrice: 0,
        waitingList: false
    });

    const handleChecked = () => {
        setFormCreate({
            ...formCreate,
            visible: !formCreate.visible
        });
    }

    const handleCheckedInfo = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.checked });
    }

    const handleInput = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeInput = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
    }

    const handleBetweenExclusive = (e) => {
        setFormCreate({ ...formCreate, exclusive: !formCreate.exclusive });
    }

    const handleBetweenWaitingList = () => {
        setFormCreate({ ...formCreate, waitingList: !formCreate.waitingList });
    }

    const handleBetweenPayment = () => {
        setFormCreate({ ...formCreate, payment: !formCreate.payment });
    }

    const handleBetweenSocios = () => {
        setFormCreate({
            ...formCreate,
            sociosValue: !formCreate.sociosValue,
            socios: formCreate.socios === "SI" ? "NO" : "TODOS"
        });
    }

    const handleAllPeople = () => {
        setFormCreate({
            ...formCreate,
            sociosValue: null,
            socios: "TODOS"
        });
    }

    const handleChangeSelect = (e) => {
        const numberOfDues = parseInt(e.target.value);
        const today = DateTime.now().plus({ months: 1 }).toFormat('01-MM-yyyy');
        let duesInfo = [today];

        for (let i = 1; i < numberOfDues; i++) {
            const nextDueDate = DateTime.fromFormat(duesInfo[i - 1], 'dd-MM-yyyy')
                .plus({ months: 1 }).toFormat('dd-MM-yyyy');
            duesInfo.push(nextDueDate);
        }

        setFormCreate({
            ...formCreate,
            duesNumber: numberOfDues,
            duesInfo: duesInfo
        });
    };

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();
        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormCreate(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formCreate.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormCreate(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormCreate({ ...formCreate, preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formCreate.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormCreate({ ...formCreate, preEndingDate: date2 });
        }
    }


    const handleEndingDateExpirate = (e) => {
        setFormCreate({
            ...formCreate,
            expiracion: e.target.value
        });
    }

    const handleWinterProgram = () => {
        const updatedWinterProgram = !formCreate.winterProgram;
        let updatedDuration = formCreate.duration;

        if (updatedWinterProgram && formCreate.summerProgram) {
            updatedDuration = "allYear";
        } else if (updatedWinterProgram && !formCreate.summerProgram) {
            updatedDuration = "winter";
        } else if (!updatedWinterProgram && formCreate.summerProgram) {
            updatedDuration = "summer";
        }

        setFormCreate({
            ...formCreate,
            winterProgram: updatedWinterProgram,
            duration: updatedDuration
        });
    };

    const handleSummerProgram = () => {
        const updatedSummerProgram = !formCreate.summerProgram;
        let updatedDuration = formCreate.duration;

        if (formCreate.winterProgram && updatedSummerProgram) {
            updatedDuration = "allYear";
        } else if (formCreate.winterProgram && !updatedSummerProgram) {
            updatedDuration = "winter";
        } else if (!formCreate.winterProgram && updatedSummerProgram) {
            updatedDuration = "summer";
        }

        setFormCreate({
            ...formCreate,
            summerProgram: updatedSummerProgram,
            duration: updatedDuration
        });
    };

    const handleAdultsProgram = () => {
        const updatedAdultsProgram = !formCreate.adultsProgram;
        let updatedAgeDescription = formCreate.ageDescription;

        if (formCreate.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (formCreate.childrenProgram && !updatedAdultsProgram) {
            updatedAgeDescription = "children";
        } else if (!formCreate.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormCreate({
            ...formCreate,
            adultsProgram: updatedAdultsProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handleChildrenProgram = () => {
        const updatedChildrenProgram = !formCreate.childrenProgram;
        let updatedAgeDescription = formCreate.ageDescription;

        if (updatedChildrenProgram && formCreate.adultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (updatedChildrenProgram && !formCreate.adultsProgram) {
            updatedAgeDescription = "children";
        } else if (!updatedChildrenProgram && formCreate.adultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormCreate({
            ...formCreate,
            childrenProgram: updatedChildrenProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handlePoolProgram = () => {
        const updatedPoolProgram = !formCreate.poolProgram;
        let updatedPoolProgramOption = formCreate.poolProgramOption;

        if (updatedPoolProgram) {
            updatedPoolProgramOption = "pool";
        }

        setFormCreate({
            ...formCreate,
            poolProgram: updatedPoolProgram,
            poolProgramOption: updatedPoolProgramOption
        });
    };

    const handleUploadImage = () => {
        const input = document.createElement("input");
        input.required = true;
        input.type = "file";
        input.ref = inputRef;
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormCreate(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    const handleReturnAndSave = () => {
        const tmpMagicArray = [...magicArray, formCreate];
        setMagicArray(tmpMagicArray);
        setValueSelected('table');
    };

    const handleCancel = () => {
        let tmpSelected = 'table';
        setValueSelected(tmpSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="form-create" onSubmit={handleSubmit}>
                <FormData
                    formCreate={formCreate}
                    handleInput={handleInput}
                    handleBetweenSocios={handleBetweenSocios}
                    handleAllPeople={handleAllPeople}
                    handleChecked={handleChecked}
                    handleEndingDateExpirate={handleEndingDateExpirate}
                />
                <FormDescriptions
                    formCreate={formCreate}
                    setFormCreate={setFormCreate}
                    width={width}
                    inputRef={inputRef}
                    handleChangeInput={handleChangeInput}
                    handleCheckedInfo={handleCheckedInfo}
                    handleBetweenWaitingList={handleBetweenWaitingList}
                    handleStartingDate={handleStartingDate}
                    handleEndingDate={handleEndingDate}
                    handlePreStartingDate={handlePreStartingDate}
                    handlePreEndingDate={handlePreEndingDate}
                    handleChangeSelect={handleChangeSelect}
                    handleBetweenPayment={handleBetweenPayment}
                    handleUploadImage={handleUploadImage}
                    handleWinterProgram={handleWinterProgram}
                    handleSummerProgram={handleSummerProgram}
                    handleAdultsProgram={handleAdultsProgram}
                    handleChildrenProgram={handleChildrenProgram}
                    handlePoolProgram={handlePoolProgram}
                />
                {valueSelected === "course" ? (
                    <FormCourse formCreate={formCreate}
                        handleChangeInput={handleChangeInput}
                        handleCheckedInfo={handleCheckedInfo}
                        handleBetweenExclusive={handleBetweenExclusive}
                        handleStartingDate={handleStartingDate}
                        handleEndingDate={handleEndingDate}
                        handleUploadImage={handleUploadImage}
                        handleBetweenWaitingList={handleBetweenWaitingList}
                        handlePreStartingDate={handlePreStartingDate}
                        handlePreEndingDate={handlePreEndingDate}
                        handleChangeSelect={handleChangeSelect}
                        handleBetweenPayment={handleBetweenPayment}
                        handleWinterProgram={handleWinterProgram}
                        handleSummerProgram={handleSummerProgram}
                        handleAdultsProgram={handleAdultsProgram}
                        handleChildrenProgram={handleChildrenProgram}
                        handlePoolProgram={handlePoolProgram}
                        inputRef={inputRef}
                    />
                ) : valueSelected === "event" ? (
                    <FormTicket
                        formCreate={formCreate}
                        handleChangeInput={handleChangeInput}
                        handleCheckedInfo={handleCheckedInfo}
                        handleBetweenExclusive={handleBetweenExclusive}
                        handleStartingDate={handleStartingDate}
                        handleEndingDate={handleEndingDate}
                        handleUploadImage={handleUploadImage}
                        inputRef={inputRef}
                    />
                ) : (
                    <FormTicket
                        formCreate={formCreate}
                        handleChangeInput={handleChangeInput}
                        handleCheckedInfo={handleCheckedInfo}
                        handleBetweenExclusive={handleBetweenExclusive}
                        handleStartingDate={handleStartingDate}
                        handleEndingDate={handleEndingDate}
                        handleUploadImage={handleUploadImage}
                    />
                )}
                <FormCat
                    formCreate={formCreate}
                    handleWinterProgram={handleWinterProgram}
                    handleSummerProgram={handleSummerProgram}
                    handleChildrenProgram={handleChildrenProgram}
                    handleAdultsProgram={handleAdultsProgram}
                    handlePoolProgram={handlePoolProgram}
                />
                <div className="flex-center">
                    <Button onClick={handleReturnAndSave}>
                        <span className="create-button-option">Guardar</span>
                    </Button>
                    <Button onClick={handleCancel}>
                        <span className="create-button-option">Cancelar</span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default FormCreate;
