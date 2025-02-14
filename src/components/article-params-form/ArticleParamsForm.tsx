import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import s from './ArticleParamsForm.module.scss';
import { FormEvent, ReactElement } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import * as formData from 'src/constants/articleProps';

type ArticleParamsFormGrops = {
	initialState: formData.ArticleStateType;
	onFormStateChange: (fieldName: string, value: formData.OptionType) => void;
	onFormSunbit: () => void;
	resetForm: () => void;
	isPanelOpened: boolean;
	togglePanel: () => void;
};

export const ArticleParamsForm = (
	props: ArticleParamsFormGrops
): ReactElement => {
	const {
		initialState,
		onFormStateChange,
		onFormSunbit,
		resetForm,
		isPanelOpened,
		togglePanel,
	} = props;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFormSunbit();
	};

	const reset = () => {
		resetForm();
	};

	return (
		<>
			<ArrowButton isPanelOpened={isPanelOpened} onClick={togglePanel} />
			<aside
				className={`${s.container}
					${isPanelOpened ? s.container_open : ''}`}>
				<form className={s.form} onSubmit={handleSubmit}>
					<h2 className={s.title}>задайте параметры</h2>

					<Select
						selected={initialState.fontFamilyOption}
						options={[...formData.fontFamilyOptions]}
						title='шрифт'
						onChange={(e) => onFormStateChange('fontFamilyOption', e)}
						name='fontFamilyOption'
					/>

					<RadioGroup
						selected={initialState.fontSizeOption}
						name='radio'
						options={[...formData.fontSizeOptions]}
						title='размер шрифта'
						onChange={(e) => onFormStateChange('fontSizeOption', e)}
					/>

					<Select
						selected={initialState.fontColor}
						options={[...formData.fontColors]}
						title='Цвет шрифта'
						onChange={(e) => onFormStateChange('fontColor', e)}
						name='fontColor'
					/>

					<Separator />

					<Select
						selected={initialState.backgroundColor}
						options={[...formData.backgroundColors]}
						title='Цвет фона'
						onChange={(e) => onFormStateChange('backgroundColor', e)}
						name='backgroundColor'
					/>

					<Select
						selected={initialState.contentWidth}
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
