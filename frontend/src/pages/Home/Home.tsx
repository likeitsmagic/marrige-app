import { NavigationData, PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { HeaderConfig } from "src/features/Header";
import {
	UserProfile,
	UserProfileName,
} from "src/features/Header/compoentens/UserProfile";
import { CampaignList, CampaignListName } from "src/features/CampaignList";
import { Searcher, SearcherName } from "src/features/Searcher";

export const Home: FC = () => {
	return (
		<PageConstructor
			custom={{
				navigation: {
					[UserProfileName]: UserProfile,
				},
				blocks: {
					[SearcherName]: Searcher,
					[CampaignListName]: CampaignList,
				},
			}}
			navigation={HeaderConfig as NavigationData}
			content={{
				blocks: [
					{
						type: SearcherName,
					},
					{
						type: CampaignListName,
					},
					{
						children: [
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
							{
								content: {
									text: "Dolor sit amet",
									title: "Lorem ipsum",
								},
								fullscreen: true,
								media: {
									previewImg:
										"/page-constructor/story-assets/video_8-12_white.png",
									youtube: "https://youtu.be/0Qd3T6skprA",
								},
								metaInfo: ["one", "two", "three"],
								type: "layout-item",
							},
						],
						title: "Full screen youtube test",
						type: "card-layout-block",
					},
					{
						button: {
							text: "Learn more",
							url: "https://example.com",
						},
						color: {
							dark: "#262626",
							light: "#EFF2F8",
						},
						disableCompress: true,
						image: {
							dark: "/page-constructor/story-assets/img_8-12_dark.png",
							light: "/page-constructor/story-assets/img_8-12_light.png",
						},
						subtitle:
							"<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> ",
						title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
						type: "banner-block",
					},
				],
			}}
		/>
	);
};
