import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import s from './ArticleParamsForm.module.scss';
import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import * as formData from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormGrops = {
	initialState: formData.ArticleStateType;
	onFormSunbit: (state: formData.ArticleStateType) => void;
	resetForm: () => void;
};

export const ArticleParamsForm = (
	props: ArticleParamsFormGrops
): ReactElement => {
	const { initialState, onFormSunbit, resetForm } = props;

	const [formState, setFormState] = useState(initialState);
	const [isPanelOpened, setPanelState] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	const closePanelByEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setPanelState(false);
		}
	};

	useOutsideClickClose({
		isOpen: isPanelOpened,
		rootRef: panelRef,
		onClose: () => setPanelState(false),
		onChange: setPanelState,
	});

	useEffect(() => {
		if (isPanelOpened) {
			document.addEventListener('keydown', closePanelByEsc);
		} else {
			document.removeEventListener('keydown', closePanelByEsc);
		}

		return () => {
			document.removeEventListener('keydown', closePanelByEsc);
		};
	}, [isPanelOpened]);

	const togglePanel = () => setPanelState((condition) => !condition);

	const onFormStateChange = (fieldName: string, value: formData.OptionType) => {
		setFormState({
			...formState,
			[fieldName]: value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFormSunbit(formState);
	};

	const reset = () => {
		resetForm();
		setFormState(initialState);
	};

	return (
		<>
			<ArrowButton isPanelOpened={isPanelOpened} onClick={togglePanel} />
			<aside
				ref={panelRef}
				className={`${s.container}
					${isPanelOpened ? s.container_open : ''}`}>
				<form className={s.form} onSubmit={handleSubmit}>
					<h2 className={s.title}>задайте параметры</h2>

					<Select
						selected={formState.fontFamilyOption}
						options={[...formData.fontFamilyOptions]}
						title='шрифт'
						onChange={(e) => onFormStateChange('fontFamilyOption', e)}
						name='fontFamilyOption'
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						options={[...formData.fontSizeOptions]}
						title='размер шрифта'
						onChange={(e) => onFormStateChange('fontSizeOption', e)}
					/>

					<Select
						selected={formState.fontColor}
						options={[...formData.fontColors]}
						title='Цвет шрифта'
						onChange={(e) => onFormStateChange('fontColor', e)}
						name='fontColor'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={[...formData.backgroundColors]}
						title='Цвет фона'
						onChange={(e) => onFormStateChange('backgroundColor', e)}
						name='backgroundColor'
					/>

					<Select
						selected={formState.contentWidth}
						options={[...formData.contentWidthArr]}
						title='Ширина контента'
						onChange={(e) => onFormStateChange('contentWidth', e)}
						name='contentWidth'
					/>

					<div className={s.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={reset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
