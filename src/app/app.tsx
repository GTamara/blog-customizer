import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const applySettings = (state: ArticleStateType) => {
		setArticleState(state);
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
				initialState={articleState}
				onFormSunbit={applySettings}
				resetForm={() => setArticleState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};
