import MediaImgWithFallback from "./MediaImgWithFallback";

function MediaDetails({ children }) {
  return <div className="space-y-4">{children}</div>;
}

function Info({ children, className = "" }) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

function Images({ backDropImage = "", posterImage = "" }) {
  return (
    <div className="flex aspect-video gap-1 sm:aspect-auto sm:h-[315px] md:h-[360px] lg:h-[420px]">
      <div className="relative hidden w-1/4 overflow-hidden rounded-lg sm:block">
          <MediaImgWithFallback
            src={posterImage}
            fill
            alt="poster image"
            className="object-cover"
            quality={100}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 342px"
          />
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg">
          <MediaImgWithFallback
            src={backDropImage}
            fill
            alt="backdrop image"
            className="object-cover"
            quality={100}
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
      </div>
    </div>
  );
}

function Actions({ children, className = "" }) {
  return (
    <div className={`mb-6 flex flex-wrap justify-center gap-4 ${className}`}>
      {children}
    </div>
  );
}

function Overview({ children, className = "" }) {
  return (
    <div className={`max-w-[850px] space-y-0.5 ${className}`}>
      <h2 className="text-xl font-medium">Overview</h2>
      {children}
    </div>
  );
}

function Director({ children, className = "" }) {
  return (
    children && (
      <div className={`flex items-start gap-3 text-sm ${className}`}>
        <p className="min-w-20 text-zinc-500">Directed by</p>
        <p>{children}</p>
      </div>
    )
  );
}

function TopActors({ children, className = "" }) {
  return (
    children && (
      <div className={`mt-1 flex items-start gap-3 text-sm ${className}`}>
        <p className="min-w-20 text-zinc-500">Top Actors</p>
        <p>{children}</p>
      </div>
    )
  );
}

MediaDetails.Info = Info;
MediaDetails.Images = Images;
MediaDetails.Actions = Actions;
MediaDetails.Director = Director;
MediaDetails.TopActors = TopActors;
MediaDetails.Overview = Overview;

export default MediaDetails;
