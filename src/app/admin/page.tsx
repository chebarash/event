"use client";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { EventType } from "../types/types";
import useUser from "../hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import Event from "../components/event";
import useAxios from "../hooks/useAxios";
import useEvents from "../hooks/useEvents";
import React from "react";
import ToJsx from "../components/jsx";
import Image from "next/image";

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `0`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref]);

  return (
    <textarea
      ref={ref}
      {...props}
      id={props.name}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
        e.target.style.height = `0`;
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      style={{ resize: `none` }}
    ></textarea>
  );
};

const venues = [
  `Conference Hall`,
  `Library`,
  `Canteen`,
  `UCA Basement`,
  `Media Lab`,
  `Gym`,
  `Parking`,
  `Lobby`,
  `Yard`,
  `MATH 104`,
  `MATH 105`,
  `MATH 106`,
  `MATH 107`,
  `MATH 108`,
  `MATH 109`,
  `MATH 110`,
  `MATH 201`,
  `MATH 204`,
  `MATH 205`,
  `MATH 206`,
  `MATH 207`,
  `MATH 208`,
  `MATH 209`,
  `MATH 210`,
  `MATH 301`,
  `MATH 304`,
  `MATH 305`,
  `MATH 306`,
  `MATH 307`,
  `MATH 308`,
  `MATH 309`,
  `MATH 310`,
  `MATH B07`,
  `MATH B08`,
  `MATH B09`,
  `UCA 204`,
  `UCA 205`,
  `UCA 209`,
  `UCA 214`,
  `UCA 215`,
  `UCA 219`,
  `UCA B14`,
  `UCA 2nd Floor`,
];

export default function AdminPage() {
  const router = useRouter();
  const params = useSearchParams().get(`_id`);
  const { events } = useEvents();
  const [waiting, setWait] = useState<boolean>(false);
  const { user, loading } = useUser();
  const e = events[params || ``];
  const isEditing = !!e;
  const [event, setEvent] = useState<EventType>(
    e || {
      _id: ``,
      title: `Event Name`,
      picture: `AgACAgIAAxkBAAIEU2bAemXsC2637DDaH2RfEeluu0NmAAJr4TEb8x4BSvU86RHWlyQHAQADAgADdwADNQQ`,
      description: `<b>bold</b>\n<i>italic</i>\n<u>underline</u>\n<s>strikethrough</s>\n<tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough </s> <u>underline italic bold</u></i> bold</b>\n<a href="http://chebarash.uz">inline URL</a>\n<a href="http://t.me/puevent">inline mention of a user</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>\n<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>`,
      author: {
        _id: ``,
        name: ``,
        description: ``,
        cover: ``,
        username: ``,
        links: [],
      },
      authorModel: `clubs`,
      date: new Date(),
      venue: venues[0],
      duration: 1000 * 60 * 60 * 3,
      shares: 0,
      participants: [],
      hashtags: [],
    }
  );
  const { fetchData } = useAxios<EventType>({
    url: `/event`,
    method: isEditing ? `put` : `post`,
    manual: true,
  });
  const isOrg = user?.organizer || user?.clubs.length;
  const orgList = [...(user?.organizer ? [user] : []), ...(user?.clubs || [])];

  useEffect(() => {
    window.Telegram.WebApp.MainButton.setParams({
      is_active: false,
      is_visible: false,
    });
    if (!loading && !isOrg) return router.push(`/?`);
    else if (isOrg && !isEditing)
      setEvent((event) => ({
        ...event,
        author: orgList[0],
        authorModel: user.organizer ? `users` : `clubs`,
      }));
  }, [user, loading, isEditing]);

  if (loading || !isOrg || !event) return <></>;
  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (waiting) return;
          window.Telegram.WebApp.showConfirm(
            `Are you sure you want to ${isEditing ? `edit` : `organize`} "${
              event.title
            }"?`,
            async (ok) => {
              if (ok) {
                setWait(true);
                const res = await fetchData({
                  data: { ...event, _id: isEditing ? event._id : undefined },
                });
                if (res) {
                  window.location.replace(`/?_id=${res?._id}`);
                }
                setWait(false);
              }
            }
          );
        }}
      >
        {orgList.length > 1 && !isEditing && (
          <div className={styles.div}>
            <h3>Author</h3>
            <p>Choose a club or yourself</p>
            <select
              name="author"
              id="author"
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  author: orgList.filter((u) => u._id == e.target.value)[0],
                  authorModel: e.target.value == user._id ? `users` : `clubs`,
                }))
              }
              value={event.author._id}
            >
              {orgList.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {isEditing && (
          <div className={styles.div}>
            <h3>Event status</h3>
            <p>If you can not organize an event, you can cancel it.</p>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  cancelled: !event.cancelled,
                }))
              }
            >
              {event.cancelled ? `Cancelled` : `Confirmed`}
            </button>
          </div>
        )}
        <div className={styles.div}>
          <h3>Title</h3>
          <p>Name of the event max 100 symbols.</p>
          <input
            required
            minLength={3}
            type="text"
            name="title"
            id="title"
            value={event.title}
            onChange={(e) =>
              setEvent((event) => ({ ...event, title: e.target.value }))
            }
          />
        </div>
        <div className={styles.div}>
          <h3>Picture</h3>
          <p>
            Just send a 16x9 photo to the bot and copy and paste his answer.
          </p>
          <input
            required
            pattern="^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$"
            type="text"
            name="picture"
            id="picture"
            value={event.picture}
            onChange={(e) =>
              setEvent((event) => ({ ...event, picture: e.target.value }))
            }
          />
        </div>
        <div className={styles.div}>
          <h3>Description</h3>
          <p>
            Describe the event in detail, you can use formatting that is
            supported in telegram.
          </p>
          <TextArea
            required
            name="description"
            value={event.description}
            onChange={(e) =>
              setEvent((event) => ({ ...event, description: e.target.value }))
            }
          />
        </div>
        <div className={styles.div}>
          <h3>Date</h3>
          <p>
            Enter the time in GMT+0, which means the time in Tashkent minus five
            hours.
          </p>
          <input
            min={new Date(Date.now() - 60 * 60 * 1000)
              .toISOString()
              .slice(0, 16)}
            required
            type="datetime-local"
            name="date"
            id="date"
            defaultValue={event.date.toISOString().slice(0, 16)}
            onChange={(e) =>
              setEvent((event) =>
                e.target.value.length
                  ? {
                      ...event,
                      date: new Date(e.target.value),
                    }
                  : event
              )
            }
          />
        </div>
        <div className={styles.div}>
          <h3>Venue</h3>
          <input
            minLength={2}
            required
            type="text"
            name="venue"
            id="venue"
            list="venues"
            value={event.venue}
            onChange={(e) =>
              setEvent((event) => ({ ...event, venue: e.target.value }))
            }
          />
          <datalist id="venues">
            {venues.map((venue) => (
              <option key={venue} value={venue} />
            ))}
          </datalist>
        </div>
        <div className={styles.div}>
          <h3>Duration</h3>
          <p>Event duration in hours.</p>
          <input
            required
            min={1}
            type="number"
            name="duration"
            id="duration"
            value={event.duration / (1000 * 60 * 60)}
            onChange={(e) =>
              setEvent((event) => ({
                ...event,
                duration: parseInt(e.target.value) * 1000 * 60 * 60,
              }))
            }
          />
        </div>
        <div className={styles.div}>
          <h3>Content</h3>
          <p>
            The message media that the user will see when you share the event.
            Just send a photo or video to the bot and copy-paste its response.
          </p>
          {event.content ? (
            <input
              required
              pattern="^(AgACAgIAAxkBAAI|BAACAgIAAxkBAAI)[A-Za-z0-9_\-]{53,70}$"
              type="text"
              name="fileId"
              id="fileId"
              value={event.content.fileId}
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  content: e.target.value.length
                    ? {
                        type: /^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$/.test(
                          e.target.value
                        )
                          ? `photo`
                          : `video`,
                        fileId: e.target.value,
                      }
                    : undefined,
                }))
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  content: {
                    type: `photo`,
                    fileId: event?.picture,
                  },
                }))
              }
            >
              Add
            </button>
          )}
          {event.content && (
            <section className={styles.preview}>
              {event.content.type == `photo` ? (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    `/photo/` +
                    event.content.fileId
                  }
                  alt="cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              ) : (
                <p>Video preview is not available</p>
              )}
            </section>
          )}
        </div>
        <div className={styles.div}>
          <h3>Template</h3>
          <p>
            The message template that the user will see when you share the
            event, you can use variables like <code>{"{{title}}"}</code>.
          </p>
          {event.template ? (
            <TextArea
              minLength={10}
              required
              name="template"
              value={event.template}
              onChange={(e) => {
                setEvent((event) => ({
                  ...event,
                  template: e.target.value.length ? e.target.value : undefined,
                }));
              }}
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  template: `<b>{{title}}</b>\n\n{{description}}\n\n<b>Venue:</b> {{venue}}\n<b>Date:</b> {{date}}\n<b>Time:</b> {{time}}\n<b>Author:</b> {{author}}\n<b>Duration:</b> {{duration}}`,
                }))
              }
            >
              Add
            </button>
          )}

          {event.template && (
            <section className={styles.preview}>
              <ToJsx>
                {event.template &&
                  Object.entries({
                    ...event,
                    date:
                      new Date(event.date).toLocaleDateString(`en`, {
                        month: `long`,
                        timeZone: `Asia/Tashkent`,
                      }) +
                      ` ` +
                      new Date(event.date).toLocaleDateString(`en`, {
                        day: `numeric`,
                        timeZone: `Asia/Tashkent`,
                      }),
                    time: new Date(event.date).toLocaleString(`en`, {
                      timeStyle: `short`,
                      timeZone: `Asia/Tashkent`,
                    }),
                    duration: `${event.duration / (1000 * 60 * 60)} ${
                      event.duration / (1000 * 60 * 60) == 1 ? `hour` : `hours`
                    }`,
                    author: event.author.name,
                  }).reduce((template, [name, value]) => {
                    return template.replace(
                      new RegExp(`{{${name}}}`, `g`),
                      String(value)
                    );
                  }, event.template)}
              </ToJsx>
            </section>
          )}
        </div>
        <div className={styles.div}>
          <h3>Button</h3>
          <p>Custom button text under message</p>
          {event.button ? (
            <input
              required
              type="text"
              name="button"
              id="button"
              value={event.button}
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  button: e.target.value.length ? e.target.value : undefined,
                }))
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  button: `Open in Event`,
                }))
              }
            >
              Add
            </button>
          )}
        </div>
        <div className={styles.div}>
          <h3>External</h3>
          <p>Custom registration link</p>
          {event.external ? (
            <input
              required
              type="url"
              name="external"
              id="external"
              value={event.external}
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  external: e.target.value.length ? e.target.value : undefined,
                }))
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  external: `https://t.me/puevent`,
                }))
              }
            >
              Add
            </button>
          )}
        </div>
        <div className={styles.div}>
          <h3>Spots</h3>
          <p>Limit number of registrations</p>
          {event.spots ? (
            <input
              required
              type="number"
              name="spots"
              id="spots"
              min={1}
              value={event.spots}
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  spots: e.target.value.length
                    ? parseInt(e.target.value)
                    : undefined,
                }))
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  spots: 1,
                }))
              }
            >
              Add
            </button>
          )}
        </div>
        <div className={styles.div}>
          <h3>Deadline</h3>
          <p>Registration deadline</p>
          {event.deadline ? (
            <input
              min={new Date().toISOString().slice(0, 16)}
              required
              type="datetime-local"
              name="deadline"
              id="deadline"
              onChange={(e) =>
                setEvent((event) => ({
                  ...event,
                  deadline: e.target.value.length
                    ? new Date(e.target.value)
                    : undefined,
                }))
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                setEvent((event) => ({
                  ...event,
                  deadline: new Date(),
                }))
              }
            >
              Add
            </button>
          )}
        </div>
        <div className={styles.div}>
          <h3>Privacy</h3>
          <p>Event visibility</p>
          <button
            type="button"
            className={styles.button}
            onClick={() =>
              setEvent((event) => ({
                ...event,
                private: !event.private,
              }))
            }
          >
            {event.private ? `Only for club members` : `Public`}
          </button>
        </div>
        <div className={styles.div}>
          <h3>Preview</h3>
          <p>Check if everything is correct</p>
          <Event {...event} open />
        </div>
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </main>
  );
}
