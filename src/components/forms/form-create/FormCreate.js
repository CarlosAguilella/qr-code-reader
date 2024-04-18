import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DateTime } from "luxon";
import { useWindowSize } from '../../hooks/useWindowSize';

import "./formCreate.css";
import FormData from "./FormData";
import FormDescriptions from "./FormDescriptions";
import FormCourse from "./FormCourse";
import FormTicket from "./FormTicket";
import FormCat from "./FormCat";

const FormCreate = ({ valueSelected, setValueSelected, arrayMagico, setArrayMagico }) => {
    const inputRef = useRef();
    const { width } = useWindowSize();
    const randomIdNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const randomIdEsp = ['-', '.', ':', ';'];
    const randomIdChar = ['a', 'b', 'c', 'd', 'e'];

    const [formCreate, setFormCreate] = useState({
        id: randomIdNum.sort(() => Math.random() - 0.5).slice(0, 4).join('') +
            randomIdEsp.sort(() => Math.random() - 0.5).slice(0, 1).join('') +
            randomIdChar.sort(() => Math.random() - 0.5).slice(0, 2).join(''),
        tipo: valueSelected,
        producto: "",
        accesos: 0,
        socios: false,
        precio: 0,
        stock: 0,
        expiracion: DateTime.now().plus({ days: 1 }).toISODate(),
        visible: false,
        deleted: false
    });

    const [formInfo, setFormInfo] = useState({
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

    const handleChange = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleChecked = () => {
        setFormCreate({
            ...formCreate,
            visible: !formCreate.visible
        });
    }

    const handleCheckedInfo = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.checked });
    }

    const handleInput = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeInput = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleBetweenExclusive = (e) => {
        setFormInfo({ ...formInfo, exclusive: !formInfo.exclusive });
    }

    const handleBetweenWaitingList = () => {
        setFormInfo({ ...formInfo, waitingList: !formInfo.waitingList });
    }

    const handleBetweenPayment = () => {
        setFormInfo({ ...formInfo, payment: !formInfo.payment });
    }

    const handleBetweenSocios = () => {
        setFormCreate({ ...formCreate, socios: !formCreate.socios });
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

        setFormInfo({
            ...formInfo,
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
            setFormInfo(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formInfo.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormInfo(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormInfo({ ...formInfo, preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formInfo.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormInfo({ ...formInfo, preEndingDate: date2 });
        }
    }


    const handleEndingDateExpirate = (e) => {
        setFormCreate({
            ...formCreate,
            expiracion: e.target.value
        });
    }

    const handleWinterProgram = () => {
        const updatedWinterProgram = !formInfo.winterProgram;
        let updatedDuration = formInfo.duration;

        if (updatedWinterProgram && formInfo.summerProgram) {
            updatedDuration = "allYear";
        } else if (updatedWinterProgram && !formInfo.summerProgram) {
            updatedDuration = "winter";
        } else if (!updatedWinterProgram && formInfo.summerProgram) {
            updatedDuration = "summer";
        }

        setFormInfo({
            ...formInfo,
            winterProgram: updatedWinterProgram,
            duration: updatedDuration
        });
    };

    const handleSummerProgram = () => {
        const updatedSummerProgram = !formInfo.summerProgram;
        let updatedDuration = formInfo.duration;

        if (formInfo.winterProgram && updatedSummerProgram) {
            updatedDuration = "allYear";
        } else if (formInfo.winterProgram && !updatedSummerProgram) {
            updatedDuration = "winter";
        } else if (!formInfo.winterProgram && updatedSummerProgram) {
            updatedDuration = "summer";
        }

        setFormInfo({
            ...formInfo,
            summerProgram: updatedSummerProgram,
            duration: updatedDuration
        });
    };

    const handleAdultsProgram = () => {
        const updatedAdultsProgram = !formInfo.adultsProgram;
        let updatedAgeDescription = formInfo.ageDescription;

        if (formInfo.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (formInfo.childrenProgram && !updatedAdultsProgram) {
            updatedAgeDescription = "children";
        } else if (!formInfo.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormInfo({
            ...formInfo,
            adultsProgram: updatedAdultsProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handleChildrenProgram = () => {
        const updatedChildrenProgram = !formInfo.childrenProgram;
        let updatedAgeDescription = formInfo.ageDescription;

        if (updatedChildrenProgram && formInfo.adultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (updatedChildrenProgram && !formInfo.adultsProgram) {
            updatedAgeDescription = "children";
        } else if (!updatedChildrenProgram && formInfo.adultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormInfo({
            ...formInfo,
            childrenProgram: updatedChildrenProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handlePoolProgram = () => {
        const updatedPoolProgram = !formInfo.poolProgram;
        let updatedPoolProgramOption = formInfo.poolProgramOption;

        if (updatedPoolProgram) {
            updatedPoolProgramOption = "pool";
        }

        setFormInfo({
            ...formInfo,
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
                setFormInfo(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    const handleReturnAndSave = () => {
        const tmpArrayMagico = [...arrayMagico, formCreate];
        setArrayMagico(tmpArrayMagico);
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
                    formInfo={formInfo}
                    handleInput={handleInput}
                    handleBetweenSocios={handleBetweenSocios}
                    handleChecked={handleChecked}
                    handleEndingDateExpirate={handleEndingDateExpirate}
                />
                <FormDescriptions
                    formCreate={formCreate}
                    formInfo={formInfo}
                    setFormInfo={setFormInfo}
                    width={width}
                    inputRef={inputRef}
                    handleChangeInput={handleChangeInput}
                />
                {valueSelected === "course" ? (
                    <FormCourse
                        formInfo={formInfo}
                        handleChangeInput={handleChangeInput}
                        handleCheckedInfo={handleCheckedInfo}
                        handleBetweenExclusive={handleBetweenExclusive}
                        handleStartingDate={handleStartingDate}
                        handleEndingDate={handleEndingDate}
                        handleUploadImage={handleUploadImage}
                    />
                ) : (
                    <FormTicket
                        formInfo={formInfo}
                        handleChangeInput={handleChangeInput}
                        handleCheckedInfo={handleCheckedInfo}
                        handleBetweenExclusive={handleBetweenExclusive}
                        handleStartingDate={handleStartingDate}
                        handleEndingDate={handleEndingDate}
                        handleUploadImage={handleUploadImage}
                    />
                )}
                <FormCat
                    formInfo={formInfo}
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
