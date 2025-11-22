"use client";

import { Card, List } from "antd";
import { BookmarkedJob } from "../templates/JobDashboardTemplate";
import BookmarkItem from "@/components/molecules/BookmarkItem";

export default function BookmarksList({ bookmarks }: { bookmarks: BookmarkedJob[] }) {
  return (
    <Card title="Bookmarked Jobs" variant="outlined">
      <List
        dataSource={bookmarks}
        renderItem={(b) => <BookmarkItem key={b.id} b={b} />}
      />
    </Card>
  );
}
