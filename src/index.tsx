import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
// import clsx from 'clsx';

// import { Article } from './components/article/Article';
// import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
// import { defaultArticleState, OptionType } from './constants/articleProps';

// import './styles/index.scss';
// import styles from './styles/index.module.scss';
import { App } from './app/app';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
