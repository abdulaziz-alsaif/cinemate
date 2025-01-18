import ListPagination from "@/components/ListPagination";
import MediaList from "@/features/media/components/MediaList";

import { getMedia } from "@/features/media/services/tmbd-services";

import { VALID_MEDIA_TYPES } from "@/utils/constants";

export async function generateMetadata(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { listType } = params;
  const page = Number(searchParams.page) || 1;
  
  const { label } = VALID_MEDIA_TYPES["movie"][listType];
  
  const title = `${label} | Page ${page}`;
    
  const description = listType === 'top-rated'
    ? `Discover the highest-rated movies of all time. Browse through our curated collection of top-rated films, rated and reviewed by movie enthusiasts.`
    : `Explore the most popular movies right now. Stay up to date with trending films and discover what everyone's watching.`;

  return {
    title,
    description,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { listType } = params;
  const page = Number(searchParams.page) || 1;

  if (!VALID_MEDIA_TYPES["movie"]?.[listType]) {
    throw new Error(`invalid category: ${listType} for movie.`);
  }
  const { label } = VALID_MEDIA_TYPES["movie"][listType];

  const { data, totalPages } = await getMedia("movie", listType, page);

  return (
    <div className="container space-y-8">
      <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
        {label}
      </h1>

      <MediaList list={data} />

      <ListPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
