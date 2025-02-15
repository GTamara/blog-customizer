import { CSSProperties, useEffect, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import clsx from 'clsx';

export const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [isPanelOpened, setPanelState] = useState(false);

	useEffect(() => {
		setArticleState(formState);
	}, []);

	const togglePanel = () => setPanelState((condition) => !condition);

	const handleFormStateChange = (fieldName: string, value: OptionType) => {
		setFormState({
			...formState,
			[fieldName]: value,
		});
	};

	const applySettings = () => {
		setArticleState(formState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialState={formState}
				onFormStateChange={handleFormStateChange}
				onFormSunbit={applySettings}
				resetForm={() => setFormState(articleState)}
				isPanelOpened={isPanelOpened}
				togglePanel={togglePanel}
			/>
			<Article panelStateHandler={() => isPanelOpened && togglePanel()} />
		</main>
	);
};
