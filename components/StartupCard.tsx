import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity.types";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _id,
    title,
    description,
    image,
    views,
    category,
    author,
    _createdAt,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">
              {author?.name || "Unknown Author"}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">
              {title || "Unknown Startup"}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          {author?.image ? (
            <Image
              src={author.image}
              width={48}
              height={48}
              alt={author?.name || "Author"}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup_card_desc">{description}</p>
        {image ? (
            <Image
              src={image}
              width={164}
              height={164}
              alt={title || "image"}
              className="startup-card_img"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
      </Link>
      <div className="mt-auto flex-between gap-3 pt-4">
        <Link href={`/?query=${category}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
